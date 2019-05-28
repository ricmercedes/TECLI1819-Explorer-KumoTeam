import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ActorRoleGuard } from '../app/guards/actor-role.guard';
import { AuthGuardGuard } from '../app/guards/auth-guard.guard';
import { from } from 'rxjs';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';
import { ProfileComponent } from './components/master/profile/profile.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard],
    data: { expectedRole: 'anonymous' }
  },
  {
    path: 'trips', children: [
      { path: ':id', component: TripDisplayComponent },
      { path: '', component: TripListComponent }
    ]
  },
  // { path: 'new-trip', component: TripDisplayComponent },

  {
    path: 'applications', children: [
      { path: ':id/:applicationID', component: ApplicationDisplayComponent },
      { path: ':id', component: ApplicationListComponent }
    ]
  },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'denied-access', component: DeniedAccessPageComponent }
  // { path: 'not-found', component: NotFoundPageComponent }
  // { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
