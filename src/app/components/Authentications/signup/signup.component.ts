import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// Services
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForms = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required),
    email_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    created_date: new FormControl('', Validators.required)
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  selectPosition(e): void {
    console.log(e.value);
    this.signupForms.patchValue({
      user_type: e.value
    });
  }

  register(): void {
    this.signupForms.patchValue({
      created_date: new Date()
    });
    console.log(this.signupForms.value);
    this.authService.createUser(this.signupForms.value);
  }
}
