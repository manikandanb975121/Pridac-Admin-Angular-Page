import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// Serivices
import { MembersService } from '../../../../services/members.service';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.css']
})
export class TeamsCreateComponent implements OnInit {

  teamsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    members: new FormControl('', Validators.required),
    created_ts: new FormControl('', Validators.required),
    home: new FormControl(false, Validators.required),
  });

  members: any;
  memberArray = [];
  membersArray2 = [];
  constructor(
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
    this.memberServices.getMembers();
    this.memberServices.getUpdatedMembers().subscribe(members => {
      console.log(members);
      this.members = members;
    });
  }

  createTeams(): void {
    this.teamsForm.patchValue({
      members: this.memberArray,
      created_ts: new Date()
    });
    console.log(this.teamsForm.value);
    this.memberServices.createTeams(this.teamsForm.value);
  }

  selectMembers(e): void {
    console.log(e);
    console.log(e.value);
    this.memberArray = e.value;
    console.log(this.memberArray);
    const s = this.members.filter(x => x === this.memberArray);
    console.log(s);
  }

  // viewMembers(): void {
  //   for(let i = 0; i < this.)
  // }
}
