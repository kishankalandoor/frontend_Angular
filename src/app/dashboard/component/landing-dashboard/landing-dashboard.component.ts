import { Component, OnInit } from '@angular/core';
import { LandingDashboardService } from '../../service/landing-dashboard.service';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-landing-dashboard',
  templateUrl: './landing-dashboard.component.html',
  styleUrls: ['./landing-dashboard.component.css']
})
export class LandingDashboardComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  dashboard: any;

  constructor(private dashboardService: LandingDashboardService, private router: Router) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
   }

  ngOnInit(): void {
    this.loading = true;
    this.getDashboardDetail();
  }

  getDashboardDetail(): void {
    this.dashboardService.getAdminDashboard().subscribe(responce => {
      console.log('Dashboard details', responce.data);
      if (responce.data !== undefined){
          this.dashboard = responce.data;
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }

  userFilter(type): void {
    this.router.navigate(['/main/user/user-list/' + type]);
  }

  projectStatusFilter(status): void {
    this.router.navigate(['/main/project/project-list/' + status]);
  }

}
