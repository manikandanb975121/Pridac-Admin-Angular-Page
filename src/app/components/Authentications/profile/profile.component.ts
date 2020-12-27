import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';

import { MatDialog } from '@angular/material/dialog';

// import interactionPlugin from '@fullcalendar/interaction';
// import { EventInput } from '@fullcalendar/core';

// Services
import { AuthService } from '../../../services/auth.service';
import { ActivityService } from '../../../services/activity.service';
import { DatePipe } from '@angular/common';

import { CreateProjectsComponent } from '../../dashboard/projects/create-projects/create-projects.component';
import {  ProfileGroupComponent } from './profile-group/profile-group.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {

  user: any;
  activites: any;
  daysAgo: number;
  // title: string;
  // date: string;
  data = [];
  activeData: any;
  topFive = [];

  // calendarPlugins = [interactionPlugin];
  calendarOptions: CalendarOptions;
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   // dateClick: this.handleDateClick.bind(this), // bind is important!
  //   // events: [
  //   //   { title: 'event 1', date: '2020-04-01' },
  //   //   { title: 'event 2', date: '2020-04-02' }
  //   // ]
  //   events: this.activites
  // };

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }

  constructor(
    private authservice: AuthService,
    private activtiyService: ActivityService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activtiyService.getActivity();
    this.activtiyService.getUpdatedActivityForUser().subscribe(activity => {
      console.log(activity);
      this.activites = activity.reverse();


      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < 5; i++) {
        this.topFive.push(this.activites[i]);
      }

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.activites.length; i++) {

        const dates = this.datePipe.transform(this.activites[i].date, 'yyyy-MM-dd');

        this.data.push({
          title: `\nTitle: ${this.activites[i].operation},\n\nOperation: ${ this.activites[i].title }`,
          // startStr: this.activites[i].title,
          date: dates
        });

      }
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        weekends: true,
        // tslint:disable-next-line: typedef
        eventClick(arg){

          const title = arg.event.title;
          const operation = arg.event.start;
          confirm(`${title}\n\nDate: ${ operation }`);
          // alert(operation);

          // const data = this.data.filter(x => x.date === arg.event.start);
          // alert(data.title);
          // const data = this.activities.find(x => x.date === arg.event)
          // alert(arg.event.start);
        },
        events: this.data,
        eventColor: '#378006'
      };
      console.log(this.data);
    });
    this.authservice.getUsers();
    this.authservice.getUpdatedCurrentUser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  handleDateClick(arg): void {
    alert('date click! ' + arg.dateStr);
  }

  openCalendar(calendar): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(calendar, {
      width: '1400px',
      height: '700px'
    });
  }

  openEvents(title, date): void {
    // tslint:disable-next-line: prefer-const
    // let dialogRef = this.dialog.open(title, {
    //   width: '1400px',
    //   height: '700px'
    // });
    console.log(title, date);
  }

  displayData(data): void {
    console.log(data);
    this.activeData = data;
    // tslint:disable-next-line: prefer-const
    let daysAgo = new Date().getDate() - new Date(this.activeData.date).getDate();
    if (daysAgo < 0) {
      daysAgo = -1 * daysAgo;
    }
    this.daysAgo = daysAgo;
  }

  openActivity(activity): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(activity, {
      width: '1400px',
      height: '600px'
    });
  }

  openTeams(): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(ProfileGroupComponent, {
      width: '800px',
      height: '600px',
      data: {
        teams: this.user.teams
      }
    });
  }
}
