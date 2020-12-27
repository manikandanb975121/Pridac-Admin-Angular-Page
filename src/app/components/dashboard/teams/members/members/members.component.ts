import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { MembersService } from '../../../../../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  userLength = 0;
  constructor(
    private router: Router,
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
    this.memberServices.getMembers();
    this.memberServices.getUpdatedMembers().subscribe(users => {
      this.userLength = users.length;
    });
  }


  openMembers(): void {
    this.router.navigate(['/members']);
  }
}
