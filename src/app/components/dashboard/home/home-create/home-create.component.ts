import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { ProjectsService } from '../../../../services/projects.service';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.css']
})
export class HomeCreateComponent implements OnInit {

  projects: any;
  currentProjects: any;
  homeForms = new FormGroup({
    project: new FormControl('', Validators.required),
    order: new FormControl('', Validators.required)
  });

  orders = [
    {
      id: 1,
      value: 1
    },
    {
      id: 2,
      value: 2
    },
    {
      id: 3,
      value: 3
    },
    {
      id: 4,
      value: 4
    },
    {
      id: 5,
      value: 5
    },
    {
      id: 6,
      value: 6
    },
    {
      id: 7,
      value: 7
    },
    {
      id: 8,
      value: 8
    }
  ];

  orders2 = [];
  constructor(
    private ProjectServices: ProjectsService,
    private homeServices: HomeService
  ) { }

  ngOnInit(): void {
    this.ProjectServices.getProjects();
    this.ProjectServices.getUpdatedProjects().subscribe(projects => {
      console.log(projects);
      this.homeServices.getHome();
      this.homeServices.getUpdatedHome().subscribe(data => {
        console.log(data);
        // const array = data.filter(x => {
        // });
        // console.log(array);
      });
      this.projects = projects;
    });
  }

  selectProjects(e): void {
    console.log(e.value);
    this.currentProjects = this.projects.find(x => x._id === e.value);
    this.homeForms.patchValue({
      project: e.value
    });
    console.log(this.currentProjects);
  }

  selectOrders(e): void {
    console.log(e.value);
    this.homeForms.patchValue({
      order: e.value
    });
  }

  create(): void {
    console.log(this.homeForms.value);
    this.homeServices.createHome(this.homeForms.value);
  }
}
