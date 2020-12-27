import { Component, OnInit } from '@angular/core';

// Pop Up Modal
import { SettingsComponent } from '../../Authentications/settings/settings.component';


import { MatDialog } from '@angular/material/dialog';

// Services
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role: string;
  settings: any;
  constructor(
    private dialog: MatDialog,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  openSettings(): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
      height: '500px'
    });

  }
}
