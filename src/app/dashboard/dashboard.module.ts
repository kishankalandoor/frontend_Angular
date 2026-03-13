import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingDashboardComponent } from './component/landing-dashboard/landing-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'landing-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'landing-dashboard', component: LandingDashboardComponent
  }
];

@NgModule({
  declarations: [LandingDashboardComponent],
  imports: [
    CommonModule, NgxLoadingModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
