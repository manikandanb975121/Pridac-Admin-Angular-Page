import { Component, OnInit } from '@angular/core';

// Services
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: any;

  constructor(
    private categoryServices: CategoryService
  ) { }

  ngOnInit(): void {

    this.categoryServices.getCategory();
    this.categoryServices.getUpdatedCategory().subscribe(category => {
      console.log(category);
      this.categories = category;
    });
  }

  deleteCategory(id): void {
    console.log(id);
    this.categories = this.categories.filter(x => x._id !== id);
    this.categoryServices.deleteCategory(id);
  }
}
