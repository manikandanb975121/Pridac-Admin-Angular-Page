import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Pop up components
import { EditProjectsComponent } from '../edit-projects/edit-projects.component';

// Services
import { ProjectsService } from '../../../../services/projects.service';
import { SettingsService } from '../../../../services/settings.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-details-projects',
  templateUrl: './details-projects.component.html',
  styleUrls: ['./details-projects.component.css']
})
export class DetailsProjectsComponent implements OnInit {

  project: any;
  multipleImages = [];
  id: string;
  imagePreview = [];
  images = [];
  sampleImages = [];
  category: string;
  role: string;
  settings: any;
  constructor(
    private route: ActivatedRoute,
    private projectServices: ProjectsService,
    private dialog: MatDialog,
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
    const Id = this.route.snapshot.paramMap.get('id');
    this.id = Id;
    console.log(Id);
    this.projectServices.getProjectById(Id);
    this.projectServices.getUpdatedProjectById().subscribe(responses => {
      this.project = responses;
      this.images = this.project.images;
      this.sampleImages = this.project.images;
      console.log(this.project);
      this.category = this.project.category;
      console.log(this.category);
    });
  }

  Images(image): void {
    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(image, {
      width: '1200px',
      height: '600px'
    });
  }

  imagePicker(event): void {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      const imagePreview = event.target.files;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {

        // tslint:disable-next-line: prefer-const
        let reader = new FileReader();

        reader.onload = ( events: any) => {
          console.log(events.target.result);
          this.imagePreview.push(events.target.result);
          // this.images.push(events.target.result);
          // this.project.images.push(events.target.result);
          //  this.myForm.patchValue({
          //     fileSource: this.images
          //  });
        };
        reader.readAsDataURL(event.target.files[i]);
      }

      console.log(this.imagePreview);
    }
  }

  uploadImages(): void{

    console.log(this.images.length);
    console.log(this.imagePreview);
    console.log(this.multipleImages);

    const formData = new FormData();
    // tslint:disable-next-line: prefer-const
    for ( let img of this.multipleImages) {
      formData.append('files', img);
    }
    this.projectServices.uploadImages(this.id, formData);
  }

  deleteProjects(id): void {
    // this.projectServices.deleteProject(id, this.category);
    if (confirm('Are you sure to delete ' + this.project.name )) {
      this.projectServices.deleteProject(id, this.category);
    }
  }

  editProjects(id): void {

    console.log(id);
    // tslint:disable-next-line: prefer-const
    let diglogRef = this.dialog.open(EditProjectsComponent, {
      width: '1200px',
      height: '600px',
      // tslint:disable-next-line: object-literal-shorthand
      data: { project: this.project, id: id }
    });
  }

  deleteImage(id): void {
    // console.log(this.images);
    // console.log(id);
    // console.log(this.project.images[id]);
    // this.project.images = this.project.images.filter(x => x !== this.project.images[id]);
    // this.images = this.images.filter(x => x !== this.images[id]);
    // this.sampleImages = this.sampleImages.filter(x => x !== this.sampleImages[id]);
    // console.log(this.project.images);
    if (confirm('Are you sure want to delete the image')) {
      this.images = this.images.filter(x => x !== this.images[id]);
      this.projectServices.updateImages(this.id, this.images);
    }
  }

  deleteImageFromPicker(id): void {
    this.imagePreview = this.imagePreview.filter(x => x !== this.imagePreview[id]);
    // this.multipleImages = this.multipleImages.filter(y => y !== this.multipleImages[id]);
    console.log(this.imagePreview);
  }
}
