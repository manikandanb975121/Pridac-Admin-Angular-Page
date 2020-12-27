import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { SettingsService } from '../../../services/settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  settings: any;

  settingsForm = new FormGroup({
    user: new FormControl(false, Validators.required),
    signup: new FormControl(false, Validators.required),
    userCanLogin: new FormControl(false, Validators.required),
    userCanSettings: new FormControl(false, Validators.required),
    forgotPassword: new FormControl(false, Validators.required)
  });

  constructor(
    private settingsServices: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsServices.getSettings();
    this.settingsServices.getUpdatedSettings().subscribe(response => {
      console.log(response);
      this.settings = response;
      this.settingsForm = new FormGroup({
        user: new FormControl(response.user, Validators.required),
        signup: new FormControl(response.signup, Validators.required),
        userCanLogin: new FormControl(response.userCanLogin, Validators.required),
        userCanSettings: new FormControl(response.userCanSettings, Validators.required),
        forgotPassword: new FormControl(response.forgotPassword, Validators.required)
      });
    });
  }

  updateSettings(): void {
    console.log(this.settingsForm.value);
    this.settingsServices.updateSettings(this.settings._id, this.settingsForm.value);
  }
}
