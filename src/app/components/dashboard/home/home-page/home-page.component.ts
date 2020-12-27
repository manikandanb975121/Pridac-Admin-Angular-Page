import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { HomeCreateComponent } from '../home-create/home-create.component';

// Services
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
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

  createHome(): void {

    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(HomeCreateComponent, {
      width: '1200px',
      height: '600px'
    });

  }
}
