import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Http Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { MatSliderModule } from '@angular/material/slider';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ProjectsComponent } from './components/dashboard/projects/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home/home.component';
import { ContactComponent } from './components/dashboard/contact/contact/contact.component';
import { TeamsComponent } from './components/dashboard/teams/teams/teams.component';
import { CreateProjectsComponent } from './components/dashboard/projects/create-projects/create-projects.component';
import { ListProjectsComponent } from './components/dashboard/projects/list-projects/list-projects.component';
import { PageProjectsComponent } from './components/dashboard/projects/page-projects/page-projects.component';
// import { MatIconModule } from '@angular/material/icon';

// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
// import { } from '@angular/material/'
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { CreateCategoryComponent } from './components/dashboard/projects/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/dashboard/projects/category/list-category/list-category.component';
import { PageCategoryComponent } from './components/dashboard/projects/category/page-category/page-category.component';
import { DetailsProjectsComponent } from './components/dashboard/projects/details-projects/details-projects.component';
import { LoginComponent } from './components/Authentications/login/login.component';
import { SignupComponent } from './components/Authentications/signup/signup.component';


// Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin

// Interceptor
import { AuthInterceptor } from './services/auth-interceptor';
import { EmailConfirmationComponent } from './components/Authentications/email/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './components/Authentications/email/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/Authentications/profile/profile.component';
import { ProfileEditComponent } from './components/Authentications/profile/profile-edit/profile-edit.component';
import { TeamsPageComponent } from './components/dashboard/teams/teams-page/teams-page.component';
import { TeamsCreateComponent } from './components/dashboard/teams/teams-create/teams-create.component';
import { TeamsListComponent } from './components/dashboard/teams/teams-list/teams-list.component';
import { MembersPageComponent } from './components/dashboard/teams/members/members-page/members-page.component';
import { MembersCreateComponent } from './components/dashboard/teams/members/members-create/members-create.component';
import { MembersListComponent } from './components/dashboard/teams/members/members-list/members-list.component';
import { TeamsDetailsComponent } from './components/dashboard/teams/teams-details/teams-details.component';
import { MembersDetailsComponent } from './components/dashboard/teams/members/members-details/members-details.component';
import { TeamsEditComponent } from './components/dashboard/teams/teams-edit/teams-edit.component';
import { HomePageComponent } from './components/dashboard/home/home-page/home-page.component';
import { HomeCreateComponent } from './components/dashboard/home/home-create/home-create.component';
import { HomeListComponent } from './components/dashboard/home/home-list/home-list.component';
import { MembersComponent } from './components/dashboard/teams/members/members/members.component';
import { ProfileGroupComponent } from './components/Authentications/profile/profile-group/profile-group.component';
import { EditProjectsComponent } from './components/dashboard/projects/edit-projects/edit-projects.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SettingsComponent } from './components/Authentications/settings/settings.component';
import { MembersGroupComponent } from './components/dashboard/teams/members/members-group/members-group.component';
import { ResetPasswordComponent } from './components/Authentications/email/reset-password/reset-password.component';
import { SnackbarComponent } from './components/snackbar/snackbar/snackbar.component';
// Import your library
// import { SlickCarouselModule } from 'ngx-slick-carousel';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  // interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    DashboardComponent,
    HomeComponent,
    ContactComponent,
    TeamsComponent,
    CreateProjectsComponent,
    ListProjectsComponent,
    PageProjectsComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    PageCategoryComponent,
    DetailsProjectsComponent,
    LoginComponent,
    SignupComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ProfileEditComponent,
    TeamsPageComponent,
    TeamsCreateComponent,
    TeamsListComponent,
    MembersPageComponent,
    MembersCreateComponent,
    MembersListComponent,
    TeamsDetailsComponent,
    MembersDetailsComponent,
    TeamsEditComponent,
    HomePageComponent,
    HomeCreateComponent,
    HomeListComponent,
    MembersComponent,
    ProfileGroupComponent,
    EditProjectsComponent,
    SettingsComponent,
    MembersGroupComponent,
    ResetPasswordComponent,
    SnackbarComponent,
    // MatButtonModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatCarouselModule.forRoot()
    // SlickCarouselModule
    // MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
