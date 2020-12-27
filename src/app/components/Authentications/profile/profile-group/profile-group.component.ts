import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

// Services
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-group',
  templateUrl: './profile-group.component.html',
  styleUrls: ['./profile-group.component.css']
})
export class ProfileGroupComponent implements OnInit {

  teams: any;

  @ViewChild('closebutton') closebutton;

  constructor(
    private authServices: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<ProfileGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    // this.authServices.getUser();
    // this.authServices.getUpdatedCurrentUser().subscribe(user => {
      // console.log(user.teams);
    this.teams = this.data.teams;
    // });
  }

  openTeams(id): void {
    this.closebutton.nativeElement.click();
    this.router.navigate(['teams', id]);
  }
}
