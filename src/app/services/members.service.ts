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
export class MembersService {

  private url = 'http://localhost:1205';
  private members = new Subject<any>();
  private membersById = new Subject<any>();
  private teams = new Subject<any>();
  private teamsById = new Subject<any>();

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

  createMembers(members): void {
    this.http.post(`${this.url}/api/users/members`, members).subscribe(responses => {
      console.log(responses);
      this.openSnackBar('Members created successfully');
      this.router.navigateByUrl('/member-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['members']);
    });
    });
  }


  getMembers(): void {
    this.http.get<{ message: string, result: any }>(`${this.url}/api/users/members`).subscribe(response => {
      console.log(response);
      this.members.next(response.result);
    });
  }

  getUpdatedMembers(): any {
    return this.members.asObservable();
  }


  createTeams(teams): void {
    this.http.post(`${this.url}/api/teams`, teams).subscribe(responses => {
      console.log(responses);
      this.openSnackBar('New Teams Created Successfully !');
      this.router.navigateByUrl('/teams-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['teams']);
    });
    });
  }

  getTeams(): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/teams`).subscribe(responses => {
      console.log(responses);
      this.teams.next(responses.result);
    });
  }

  getUpdatedTeams(): any {
    return this.teams.asObservable();
  }

  getTeamsById(id): void {
    this.http.get<{ message: string, result: any }>(`${this.url}/api/teams/${id}`).subscribe(responses => {
      console.log(responses);
      this.teamsById.next(responses.result);
    });
  }

  getUpdatedTeamssById(): any {
    return this.teamsById.asObservable();
  }

  getMembersbyId(id): void {
    this.http.get<{ message: string, result: any}>(`${this.url}/api/users/${id}`).subscribe(responses => {
      console.log(responses);
      this.membersById.next(responses.result);
    });
  }

  getUpdatedMembersById(): any {
    return this.membersById.asObservable();
  }

  deleteTeams(id): void {
    this.http.delete(`${this.url}/api/teams/${id}/${ new Date() }`).subscribe(response => {
      console.log(response);
      this.openSnackBar('Teams Deleted Successfully');
    });
  }


  deleteUSer(id): void {
    this.http.delete(`${this.url}/api/users/${id}/${ new Date() }`).subscribe(response => {
      console.log(response);
      this.openSnackBar('Users Deleted Successfully');
    });
  }


  updateTeams(id, data): void {
    this.http.post(`${this.url}/api/teams/edit/${id}/${ new Date()}`, data).subscribe(response => {
      console.log(response);
      this.openSnackBar('Teams Updated Successfully !');
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
