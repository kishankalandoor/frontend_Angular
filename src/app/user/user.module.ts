import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { FreelancerComponent } from './component/user-details/freelancer/freelancer.component';
import { CustomerComponent } from './component/user-details/customer/customer.component';
import { AdminComponent } from './component/user-details/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { NoRoleComponent } from './component/user-details/no-role/no-role.component';
import { FormsModule } from '@angular/forms';
import { AgencyComponent } from './component/user-details/agency/agency.component';



const routes: Routes = [
      {
        path:'',
        redirectTo : 'user-list',
        pathMatch: 'full'
      },
      {
        path: 'user-list', component: UserListComponent
      },
      {
        path: 'user-detail/:userId', component: UserDetailsComponent
      },
      {
        path: 'user-detail/:userId/:role', component: UserDetailsComponent
      },
      {
        path: 'user-list/:userType', component: UserListComponent
      }
];

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent, FreelancerComponent,
     CustomerComponent, AdminComponent, NoRoleComponent, AgencyComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, NgbModule, NgxLoadingModule, FormsModule, RouterModule.forChild(routes)
  ]
})
export class UserModule { }
