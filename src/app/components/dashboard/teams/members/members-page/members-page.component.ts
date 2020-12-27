import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Modal Pop Up
import { MembersCreateComponent } from '../members-create/members-create.component';

// Services
import { SettingsService } from '../../../../../services/settings.service';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  role: string;
  settings: any;

  constructor(
    private dialog: MatDialog,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  createMembers(): void {
    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(MembersCreateComponent, {
      width: '1200px',
      height: '600px'
    });
  }
}
