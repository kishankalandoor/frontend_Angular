import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquirieListComponent } from './component/inquirie-list/inquirie-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'inquirie-list',
    pathMatch: 'full'
  },
  {
    path: 'inquirie-list', component: InquirieListComponent
  }
];

@NgModule({
  declarations: [InquirieListComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, NgxLoadingModule,
    RouterModule.forChild(routes)
  ]
})
export class InquirieModule { }
