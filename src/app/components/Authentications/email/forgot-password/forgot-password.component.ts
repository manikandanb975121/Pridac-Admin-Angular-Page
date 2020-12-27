import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


// Services
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  email = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.email.value);
    const data = { email: this.email.value };
    this.authService.forgorPassword(data);
  }
}
