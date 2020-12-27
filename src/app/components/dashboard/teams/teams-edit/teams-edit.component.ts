import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { MembersService } from '../../../../services/members.service';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.css']
})
export class TeamsEditComponent implements OnInit {

  teamsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    members: new FormControl('', Validators.required),
    created_ts: new FormControl('', Validators.required),
    home: new FormControl(false, Validators.required),
  });

  members: any;
  members2 = [];
  memberArray = [];
  membersArray2 = [];
  memberArray3 = [];
  overAllMember = [];
  constructor(
    public dialogRef: MatDialogRef<TeamsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.memberServices.getTeamsById(this.data.id);
    this.memberServices.getUpdatedTeamssById().subscribe(teams => {
      this.memberServices.getMembers();
      this.memberServices.getUpdatedMembers().subscribe(members => {
        console.log(members);
        this.members = members;


          // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < teams.members.length; j++) {

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < members.length; i++) {
                console.log(this.members);
                console.log(members[i]._id);
                console.log(teams.members[j]._id);
                console.log(members[i]._id === teams.members[j]._id);
                if (members[i]._id === teams.members[j]._id) {
                  console.log(i);
                  if (i > -1) {
                    this.members.splice(i, 1);
                  }
                  console.log('true da thambi');
                  console.log(this.members);
              }
          }
        }

      });
      console.log(teams);
      this.memberArray = teams.members;
      console.log(this.memberArray);

      this.memberArray.filter(x => {
        this.memberArray3.push(x._id);
      });

      this.teamsForm = new FormGroup({
        name: new FormControl(teams.name, Validators.required),
        members: new FormControl('', Validators.required),
        // created_ts: new FormControl(, Validators.required),
        home: new FormControl(teams.home, Validators.required),
      });
    });
  }

  selectMembers(e): void {
    console.log(e);
    console.log(e.value);
    this.membersArray2 = e.value;
    console.log(this.memberArray);
  }

  createTeams(): void {
    this.memberArray3.filter(x => {
      console.log(x);
      this.overAllMember.push(x);
    });
    this.membersArray2.filter(x => {
      console.log(x);
      this.overAllMember.push(x);
    });
    this.teamsForm.patchValue({
      members: this.overAllMember
    });
    console.log(this.teamsForm.value);
    this.memberServices.updateTeams(this.data.id, this.teamsForm.value);
  }

  deleteMember(id): void {
    console.log(id);
    console.log(this.memberArray3);
    const member = this.memberArray.find(x => x._id === id);
    this.memberArray = this.memberArray.filter(x => x._id !== id);
    this.memberArray3 = this.memberArray3.filter(x => x !== id);
    this.members.push(member);
    console.log(this.members);
    this.memberArray.filter(x => {
      if (this.memberArray3.find((y) => y === x._id) === undefined) {
        this.memberArray3.push(x._id);
       }
    });
  }

}
