import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { MembersService } from '../../../../services/members.service';

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.css']
})
export class TeamsDetailsComponent implements OnInit {

  members: any;
  teams: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.memberServices.getTeamsById(id);
    this.memberServices.getUpdatedTeamssById().subscribe(responses => {
      this.members = responses.members;
      this.teams = responses;
    });
  }

  viewMembers(id): void {
    this.router.navigate(['members', id]);
  }
}
