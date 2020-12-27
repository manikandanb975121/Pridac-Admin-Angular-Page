import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  user: any;
  image = localStorage.getItem('profile_pic');

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStateListener().subscribe(isAutheticated => {
        this.userIsAuthenticated = isAutheticated;
        this.authService.getUser().subscribe(user => {
          console.log(user);
          this.user = user;
        });
      });
  }

  ngOnDestroy(): void {
    // this.mediaSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  // tslint:disable-next-line: typedef
  isAuthenticated() {
    return this.userIsAuthenticated;
  }

  myProfile(): void {
    this.router.navigate(['/profile']);
  }
}
