import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


// Snackbar
import { SnackbarComponent } from '../components/snackbar/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url = 'http://localhost:1205';
  private projects = new Subject<any>();
  private projectsById = new Subject<any>();

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  postProjects(projects): void {
    this.http.post(`${this.url}/api/projects`, projects).subscribe(response => {
      console.log(response);
      this.openSnackBar('New Project Created Successfully');
    });
  }

  getProjects(): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/projects`).subscribe(response => {
      console.log(response);
      this.projects.next(response.result);
    });
  }

  getUpdatedProjects(): any {
    return this.projects.asObservable();
  }

  getProjectById(id): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/projects/${id}`).subscribe(response => {
      console.log(response);
      this.projectsById.next(response.result);
    });
  }

  getUpdatedProjectById(): any {
    return this.projectsById.asObservable();
  }

  uploadImages(id, data): void {
    // console.log(images);
    console.log(data);
    // tslint:disable-next-line: object-literal-shorthand
    // const datas = {data: data, images: images};
    this.http.post(`${this.url}/api/projects/${id}/images/${ new Date() }`, data).subscribe(res => {
      console.log(res);
      this.openSnackBar('Images Uploaded Successfully');
    });
  }

  deleteProject(id, category): void {
    // const data = { created_ts: new Date() };
    this.http.delete(`${this.url}/api/projects/${id}/${new Date()}/${category}`).subscribe(res => {
      console.log(res);
      this.router.navigate(['/projects']);
      this.openSnackBar('Project Deleted Successfully');
    });
  }

  editProject(id, data, category): void {
    console.log(id);
    this.http.post(`${this.url}/api/projects/edit/${id}/${new Date()}/${category}`, data).subscribe(res => {
      console.log(res);
      this.openSnackBar('Project Updated Successfully');
      this.router.navigate(['/projects', id]);
    });
   }

   editProjectString(id, data, category): void {
    console.log(data);
    this.http.post(`${this.url}/api/projects/editString/${id}/${new Date()}/${category}`, data).subscribe(res => {
      console.log(res);
      this.openSnackBar('Project Updated Successfully');
      this.router.navigate(['/projects', id]);
    });
   }

   updateImages(id, data): void {
     console.log(data);
     const datas = { images : data};
     console.log(datas);
     this.http.post<{message: string}>(`${this.url}/api/projects/update/${id}`, datas).subscribe(res => {
       console.log(res);
       this.openSnackBar(res.message);
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
