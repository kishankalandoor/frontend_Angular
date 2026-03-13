import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FreelancerChargeComponent } from './component/aeromaritime-charge/freelancer-charge.component';
import { ClientChargeComponent } from './component/aeromaritime-charge/client-charge.component';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'client-charges',
    pathMatch: 'full'
  },
  {
    path: 'client-charges',  component: ClientChargeComponent
  },
  {
    path: 'freelancer-charges', component: FreelancerChargeComponent
  },
];


@NgModule({
  declarations: [FreelancerChargeComponent, ClientChargeComponent],
  imports: [
    CommonModule, TooltipModule, FormsModule, ReactiveFormsModule, SharedModule, NgxLoadingModule, ToastrModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class AeromaritimeChargesModule { }
