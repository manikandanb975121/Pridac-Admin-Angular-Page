import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { MembersService } from '../../../../services/members.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamsLength = 0;
  constructor(
    private router: Router,
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
    this.memberServices.getTeams();
    this.memberServices.getUpdatedTeams().subscribe(temas => {
      this.teamsLength = temas.length;
    });
  }

  openTeams(): void {
    this.router.navigate(['/teams']);
  }
}
