import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';


// Services
import { CategoryService } from '../../../../services/category.service';
import { ProjectsService } from '../../../../services/projects.service';


@Component({
  selector: 'app-create-projects',
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css']
})
export class CreateProjectsComponent implements OnInit {

  imagePreview: any;

  createProjectForms = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    construction_date: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    created_ts: new FormControl('', Validators.required)
  });

  categories: any;

  constructor(
    private categoryServices: CategoryService,
    private projectServices: ProjectsService
  ) { }

  ngOnInit(): void {
    this.categoryServices.getCategory();
    this.categoryServices.getUpdatedCategory().subscribe(response => {
      this.categories = response;
    });
    this.createProjectForms.patchValue({
      status: 'view'
    });
  }

  selectCategory(e): void {
    console.log(e.value);
    this.createProjectForms.patchValue({
      category: e.value
    });
  }

  imagePicker(e): void {
    // console.log(e);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      this.createProjectForms.patchValue({
        image: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // console.log(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }
  submit(): void {
    this.createProjectForms.patchValue({
      created_ts: new Date()
    });
    const formData = new FormData();
    formData.append('name', this.createProjectForms.value.name);
    formData.append('code', this.createProjectForms.value.code);
    formData.append('description', this.createProjectForms.value.description);
    formData.append('status', this.createProjectForms.value.status);
    formData.append('location', this.createProjectForms.value.location);
    formData.append('category', this.createProjectForms.value.category);
    formData.append('construction_date', this.createProjectForms.value.construction_date);
    formData.append('value', this.createProjectForms.value.value);
    formData.append('image', this.createProjectForms.value.image);
    formData.append('created_ts', this.createProjectForms.value.created_ts);
    console.log(this.createProjectForms.value);
    this.projectServices.postProjects(formData);
  }
}
