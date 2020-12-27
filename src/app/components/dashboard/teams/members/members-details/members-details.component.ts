import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Components
import { ProfileGroupComponent } from '../../../../Authentications/profile/profile-group/profile-group.component';

// Full Calendar
import { CalendarOptions } from '@fullcalendar/angular';

// Pop up Modal
import { MatDialog } from '@angular/material/dialog';

import { DatePipe } from '@angular/common';

// Services
import { MembersService } from '../../../../../services/members.service';
import { ActivityService } from '../../../../../services/activity.service';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css'],
  providers: [DatePipe]
})
export class MembersDetailsComponent implements OnInit {
  user: any;
  activity: any;
  data = [];
  topFiveActivity = [];
  teams: any;
  calendarOptions: CalendarOptions;

  constructor(
    private route: ActivatedRoute,
    private memberServices: MembersService,
    private activityServices: ActivityService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.memberServices.getMembersbyId(id);
    this.memberServices.getUpdatedMembersById().subscribe(users  => {
      this.user = users;
      console.log(this.user);
      this.teams = this.user.teams;
      console.log(this.teams);
    });

    this.activityServices.getActivityById(id);
    this.activityServices.getUpdatedActivityById().subscribe(activity => {
      console.log(activity);
      this.activity = activity[0].activity;
      this.activity = this.activity.reverse();

      if (this.activity.length > 0) {
        for (let i = 0; i < 5; i++) {
          this.topFiveActivity.push(this.activity[i]);
        }
      }
      // tslint:disable-next-line: prefer-for-of


      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.activity.length; i++) {

        const dates = this.datePipe.transform(this.activity[i].date, 'yyyy-MM-dd');

        this.data.push({
          title: `\nTitle: ${this.activity[i].operation},\n\nOperation: ${ this.activity[i].title }`,
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

  }

  openCalendar(calendar): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(calendar, {
      width: '1400px',
      height: '700px'
    });
  }

  handleDateClick(arg): void {
    alert('date click! ' + arg.dateStr);
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
