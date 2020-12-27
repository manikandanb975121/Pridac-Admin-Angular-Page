import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from 'jquery';


// Services
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pridac-admin';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
