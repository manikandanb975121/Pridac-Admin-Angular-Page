import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://localhost:1205';
  private homeProjects = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  createHome(data): void {
    this.http.post(`${this.url}/api/home`, data).subscribe(responses => {
      console.log(responses);
    });
  }

  getHome(): void {
    this.http.get<{ message: string, result: any }>(`${this.url}/api/home`).subscribe(responses => {
      console.log(responses);
      this.homeProjects.next(responses.result);
    });
  }

  getUpdatedHome(): any {
    return this.homeProjects.asObservable();
  }
}
