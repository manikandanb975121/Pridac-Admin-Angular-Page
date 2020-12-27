import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// Services
import { MembersService } from '../../../../../services/members.service';
@Component({
  selector: 'app-members-create',
  templateUrl: './members-create.component.html',
  styleUrls: ['./members-create.component.css']
})
export class MembersCreateComponent implements OnInit {

  imagePreview: any;
  membersForms = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required),
    email_id: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    created_date: new FormControl('', Validators.required),
    profile_pic: new FormControl('', Validators.required)
  });
  positions = [
    {
      name: 'Admin',
      value: 'admin'
    },
    {
      name: 'User',
      value: 'user'
    }
  ];
  constructor(
    private memberServices: MembersService
  ) { }

  ngOnInit(): void {
  }
  selectPosition(e): void {
    console.log(e.value);
    this.membersForms.patchValue({
      user_type: e.value
    });
  }

  imagePicker(e): void {
    // console.log(e);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      this.membersForms.patchValue({
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

  register(): void {
    this.membersForms.patchValue({
      created_date: new Date()
    });
    console.log(this.membersForms.value);
    const formData = new FormData();
    formData.append('first_name', this.membersForms.value.first_name);
    formData.append('last_name', this.membersForms.value.last_name);
    formData.append('position', this.membersForms.value.position);
    formData.append('user_type', this.membersForms.value.user_type);
    formData.append('email_id', this.membersForms.value.email_id);
    formData.append('phone_number', this.membersForms.value.phone_number);
    formData.append('created_date', this.membersForms.value.created_date);
    formData.append('profile_pic', this.membersForms.value.profile_pic);
    this.memberServices.createMembers(formData);
  }
}
