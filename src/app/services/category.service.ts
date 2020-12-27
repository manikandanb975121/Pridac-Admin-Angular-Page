import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { SnackbarComponent } from '../components/snackbar/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:1205';
  private category = new Subject<any>();


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

  // tslint:disable-next-line: typedef
  postCategory(category){
    this.http.post<{ message: string, result: any}>(`${this.url}/api/category/${ new Date() }`, category).subscribe((response) => {
      console.log(response);
      this.category.next(response.result);
      this.openSnackBar(response.message);
    });
  }

  // tslint:disable-next-line: typedef
  getCategory() {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/category`).subscribe((response) => {
      this.category.next(response.result);
    });
  }

  // tslint:disable-next-line: typedef
  getUpdatedCategory() {
    return this.category.asObservable();
  }

  deleteCategory(id): void {
    this.http.delete(`${this.url}/api/category/${id}`).subscribe((response) => {
      console.log(response);
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
