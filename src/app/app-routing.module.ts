import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
// Dashboard Projects
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ProjectsComponent } from './components/dashboard/projects/projects/projects.component';
import { PageProjectsComponent } from './components/dashboard/projects/page-projects/page-projects.component';
import { DetailsProjectsComponent } from './components/dashboard/projects/details-projects/details-projects.component';
import { SignupComponent } from './components/Authentications/signup/signup.component';
import { LoginComponent } from './components/Authentications/login/login.component';
import { EmailConfirmationComponent } from './components/Authentications/email/email-confirmation/email-confirmation.component';
import { ProfileComponent } from './components/Authentications/profile/profile.component';
import { TeamsPageComponent } from './components/dashboard/teams/teams-page/teams-page.component';
import { MembersPageComponent } from './components/dashboard/teams/members/members-page/members-page.component';
import { ForgotPasswordComponent } from './components/Authentications/email/forgot-password/forgot-password.component';
import { MembersListComponent } from './components/dashboard/teams/members/members-list/members-list.component';
import { TeamsDetailsComponent } from './components/dashboard/teams/teams-details/teams-details.component';
import { MembersDetailsComponent } from './components/dashboard/teams/members/members-details/members-details.component';
import { HomePageComponent } from './components/dashboard/home/home-page/home-page.component';
import { AuthGuard } from './Guard/auth-gaurd';
import { TeamsListComponent } from './components/dashboard/teams/teams-list/teams-list.component';
import { ResetPasswordComponent } from './components/Authentications/email/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: PageProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id',
    component: DetailsProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'confirmation/:accessToken',
    component: EmailConfirmationComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'teams',
    component: TeamsPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'members',
    component: MembersPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'resetPassword/:accessToken',
    component: ResetPasswordComponent
  },
  {
    path: 'member-list',
    component: MembersListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'teams/:id',
    component: TeamsDetailsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'members/:id',
    component: MembersDetailsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'teams-list',
    component: TeamsListComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
