import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  ProjectLength = 0;

  constructor(
    private router: Router,
    private projectServices: ProjectsService
  ) { }

  ngOnInit(): void {
    this.projectServices.getProjects();
    this.projectServices.getUpdatedProjects().subscribe(projects => {
      this.ProjectLength = projects.length;
    });
  }

  // tslint:disable-next-line: typedef
  openProjects() {
    this.router.navigate(['/projects']);
  }
}
