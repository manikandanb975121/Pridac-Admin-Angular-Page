import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url = 'http://localhost:1205';
  private userActivity = new Subject<any>();
  private userActivityById = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getActivity(): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/activity`).subscribe(response => {
      console.log(response);
      this.userActivity.next(response.result[0].activity);
    });
  }

  getUpdatedActivityForUser(): any {
    return this.userActivity.asObservable();
  }

  getActivityById(id): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/activity/${id}`).subscribe(response => {
        this.userActivityById.next(response.result);
        console.log(response);
    });
  }

  getUpdatedActivityById(): any {
    return this.userActivityById.asObservable();
  }
}
