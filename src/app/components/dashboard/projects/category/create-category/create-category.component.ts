import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// Service
import { CategoryService } from '../../../../../services/category.service';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  createCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  constructor(
    private categoryServices: CategoryService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.createCategory.value);
    this.categoryServices.postCategory(this.createCategory.value);
  }

}
