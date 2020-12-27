import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

// Services
import { CategoryService } from '../../../../services/category.service';
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {

  imagePreview = [];
  multipleImages: any;
  category: string;

  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    construction_date: new FormControl(false, Validators.required),
    description: new FormControl('', Validators.required),
    iconic_image: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });

  projects: any;
  categories: any;
  constructor(
    public dialogRef: MatDialogRef<EditProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategory();
    this.categoryService.getUpdatedCategory().subscribe(response => {
      this.categories = response;
    });
    // console.log(this.data);
    this.projects = this.data.project;
    console.log(this.projects);
    console.log(typeof(this.projects.iconic_image));
    this.projectForm = new FormGroup({
      name: new FormControl(this.projects.name, Validators.required),
      category: new FormControl(this.projects.category, Validators.required),
      code: new FormControl(this.projects.code, Validators.required),
      construction_date: new FormControl(this.projects.construction_date, Validators.required),
      description: new FormControl(this.projects.description, Validators.required),
      iconic_image: new FormControl(this.projects.iconic_image, Validators.required),
      location: new FormControl(this.projects.location, Validators.required),
      value: new FormControl(this.projects.value, Validators.required),
      status: new FormControl(this.projects.status, Validators.required)
    });
    this.category = this.projects.category;
    console.log(this.category);
  }

  selectCategory(e): void {
    console.log(e.value);
    this.projectForm.patchValue({
      category: e.value
    });
  }

  updateProject(): void {
    console.log(typeof(this.projectForm.value.iconic_image));
    const formData = new FormData();
    formData.append('name', this.projectForm.value.name);
    formData.append('code', this.projectForm.value.code);
    formData.append('description', this.projectForm.value.description);
    formData.append('status', this.projectForm.value.status);
    formData.append('location', this.projectForm.value.location);
    formData.append('category', this.projectForm.value.category);
    formData.append('construction_date', this.projectForm.value.construction_date);
    formData.append('value', this.projectForm.value.value);
    formData.append('iconic_image', this.projectForm.value.iconic_image);
    // formData.append('created_ts', this.projectForm.value.created_ts);
    console.log(this.projectForm.value);
    if (typeof(this.projectForm.value.iconic_image) === 'object') {
      this.projectService.editProject(this.data.id, formData, this.category);
    } else if (typeof(this.projectForm.value.iconic_image) === 'string') {
      this.projectService.editProjectString(this.data.id, this.projectForm.value, this.category);
      console.log(this.projectForm.value);
    }
    // this.projectService.editProject(this.data.id, formData);
  }

  deleteImage(indexs): void {
    console.log(indexs);
    const Img = [];
    this.projects.images.forEach((x, index) => {
      console.log(index);
      if (index !== indexs) {
        Img.push(x);
      }
    });

    console.log(Img);
    this.projects.images = Img;
  }

  deleteIconic(): void {
    console.log('Iconic');
    this.projects.iconic_image = null;
  }

  imagePicker(e): void {
    // console.log(e);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      this.projectForm.patchValue({
        iconic_image: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.projects.iconic_image = reader.result;
        // console.log(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  multiImagePicker(event): void {
    // console.log(e);
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      const imagePreview = event.target.file;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {

        // tslint:disable-next-line: prefer-const
        let reader = new FileReader();

        reader.onload = ( events: any) => {
          console.log(events.target.result);
          this.imagePreview.push(events.target.result);
          // this.projects.images.push(events.target.result);
          //  this.myForm.patchValue({
          //     fileSource: this.images
          //  });
        };
        reader.readAsDataURL(event.target.files[i]);
      }

      console.log(this.imagePreview);
    }
  }
}
