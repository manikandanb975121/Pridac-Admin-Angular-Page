import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


// Services
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  reset = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  check = false;
  accessToken: string;
  constructor(
    private route: ActivatedRoute,
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
    this.accessToken = this.route.snapshot.paramMap.get('accessToken');
    console.log(this.accessToken);
    this.reset.get('confirmPassword').valueChanges.subscribe(val => {
      if (this.reset.value.password === val) {
        this.check = true;
      }
    });
  }



  submit(): void {
    console.log(this.reset.value.password);
    const data =  { password: this.reset.value.password, accessToken:  this.accessToken };
    console.log(data);
    this.authServices.changePassword(data);
  }
}
