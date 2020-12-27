import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

// Snackbar
import { SnackbarComponent } from '../components/snackbar/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private url = 'http://localhost:1205';
  private settings = new Subject<any>();

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  createSettings(data): void {
    this.http.post(`${this.url}/api/settings`, data).subscribe(response => {
      console.log(response);
    });
  }

  getSettings(): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/settings`).subscribe(response => {
      console.log(response);
      this.settings.next(response.result);
    });
  }

  getUpdatedSettings(): any {
    return this.settings.asObservable();
  }

  updateSettings(id, data): void {
    this.http.post(`${this.url}/api/settings/${id}`, data).subscribe(response => {
      console.log(response);
      this.openSnackBar('Settings Updated!');
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      ...this.configSuccess,
      // tslint:disable-next-line: object-literal-shorthand
      duration: 3000
    });
  }

}
