import { Component, OnInit } from '@angular/core';

// Pop up Account
import { CreateProjectsComponent } from '../create-projects/create-projects.component';
import { PageCategoryComponent } from '../category/page-category/page-category.component';

import { MatDialog } from '@angular/material/dialog';

// Services
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.css']
})
export class PageProjectsComponent implements OnInit {

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


  createProject(): void {

    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(CreateProjectsComponent, {
      width: '1200px',
      height: '600px'
    });
  }

  openCategory(): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(PageCategoryComponent, {
      width: '600px',
      height: '400px'
    });
  }

}
