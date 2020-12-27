import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { MembersService } from '../../../../../services/members.service';
import { SettingsService } from '../../../../../services/settings.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  members: any;
  role: string;
  settings: any;

  constructor(
    private memberServices: MembersService,
    private router: Router,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.memberServices.getMembers();
    this.memberServices.getUpdatedMembers().subscribe(members => {
      console.log(members);
      this.members = members;
    });
    this.role = localStorage.getItem('role');
    console.log(this.role);
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  deleteUser(id): void {
    console.log(id);
    if (confirm('Are you Sure to delete member')) {
      this.members = this.members.filter(x => x._id !== id);
      this.memberServices.deleteUSer(id);
    }

  }
  view(id): void {
    console.log(id);
    this.router.navigate(['/members', id]);
  }
}
