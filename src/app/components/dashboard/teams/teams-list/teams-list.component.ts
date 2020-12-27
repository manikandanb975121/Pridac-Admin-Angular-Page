import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Services
import { MembersService } from '../../../../services/members.service';
import { SettingsService } from '../../../../services/settings.service';

// Modal Pop up
import { TeamsEditComponent } from '../teams-edit/teams-edit.component';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  members: any;
  role: string;
  settings: any;

  constructor(
    private memberServices: MembersService,
    private router: Router,
    private dialog: MatDialog,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.memberServices.getTeams();
    this.memberServices.getUpdatedTeams().subscribe(teams => {
      console.log(teams);
      this.members = teams;
    });
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  openTeams(id): void {
    console.log(id);
    this.router.navigate(['teams', id]);
  }

  deleteTeams(id): void {
    this.members = this.members.filter(x => x._id !== id);
    this.memberServices.deleteTeams(id);
  }

  editTeams(id): void {
    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(TeamsEditComponent, {
      width: '1200px',
      height: '600px',
      data: {
        // tslint:disable-next-line: object-literal-shorthand
        id: id
      }
    });
  }
}
