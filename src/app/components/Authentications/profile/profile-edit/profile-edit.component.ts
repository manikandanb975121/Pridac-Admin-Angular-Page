import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


// Services
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    // user_type: new FormControl('', Validators.required),
    email_id: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    updated_date: new FormControl('', Validators.required),
    profile_pic: new FormControl('', Validators.required)
  });
  user: any;
  imagePreview: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUsers();
    this.authService.getUpdatedCurrentUser().subscribe(user => {
      console.log(user);
      this.user = user;
      this.editForm = new FormGroup({
        first_name: new FormControl(user.first_name, Validators.required),
        last_name: new FormControl(user.last_name, Validators.required),
        position: new FormControl(user.position, Validators.required),
        // email_id: new FormControl(user.email_id, Validators.required),
        phone_number: new FormControl(user.phone_number, Validators.required),
        profile_pic: new FormControl(user.profile_pic, Validators.required),
        updated_date: new FormControl('', Validators.required),
      });
    });
  }

  imagePicker(e): void {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      this.editForm.patchValue({
        profile_pic: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // console.log(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  update(): void {
    this.editForm.patchValue({
      updated_date: new Date()
    });
    console.log(this.editForm.value);
    const formData = new FormData();
    formData.append('first_name', this.editForm.value.first_name);
    formData.append('last_name', this.editForm.value.last_name);
    formData.append('phone_number', this.editForm.value.phone_number);
    formData.append('position', this.editForm.value.position);
    formData.append('profile_pic', this.editForm.value.profile_pic);
    formData.append('updated_date', this.editForm.value.updated_date);
    this.authService.UpdateProfile(formData);
  }
}
