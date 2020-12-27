import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Components
import { ForgotPasswordComponent } from '../email/forgot-password/forgot-password.component';
import { SignupComponent } from '../signup/signup.component';

// Services
import { AuthService } from '../../../services/auth.service';
import { SettingsService } from '../../../services/settings.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  settings: any;

  loginForm = new FormGroup({
    email_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private settingsServices: SettingsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);
  }

  forgotPassword(): void {
    this.router.navigate(['forgotPassword']);
  }
  openForgotPassword(): void {
    console.log('forgot password');
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '1000px',
      height: '600px'
    });
  }

  openSignUp(): void {
    // tslint:disable-next-line: prefer-const
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '1000px',
      height: '600px'
    });
  }
}
