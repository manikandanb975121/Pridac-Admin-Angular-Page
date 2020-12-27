import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  projects: any;

  constructor(
    private projectServices: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectServices.getProjects();
    this.projectServices.getUpdatedProjects().subscribe(response => {
      console.log(response);
      this.projects = response;
    });
  }

  openProject(id): void {
    console.log(id);
    this.router.navigate([`/projects/${id}`]);
  }
}
