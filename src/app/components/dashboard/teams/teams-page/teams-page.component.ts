import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Pop Up
import { TeamsCreateComponent } from '../teams-create/teams-create.component';

// Services
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  role: string;
  settings: any;

  constructor(
    private dialog: MatDialog,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  createTeams(): void {
    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(TeamsCreateComponent, {
      width: '1200px',
      height: '600px'
    });
  }
}
