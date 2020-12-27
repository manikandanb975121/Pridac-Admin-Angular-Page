import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  projects: any;
  constructor(
    private homeServices: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.homeServices.getHome();
    this.homeServices.getUpdatedHome().subscribe(projects => {
      console.log(projects);
      this.projects = projects;
    });
  }

  openProject(id): void {
    console.log(id);
    this.router.navigate([`/projects/${id}`]);
  }

}
