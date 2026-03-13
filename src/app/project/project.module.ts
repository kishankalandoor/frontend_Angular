import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { ProjectViewDetailsComponent } from './component/project-view-details/project-view-details.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { BidderListComponent } from './component/bidder-list/bidder-list.component';

const routes: Routes = [
      {
        path:'',
        redirectTo : 'project-list',
        pathMatch: 'full'
      },
      {
        path: 'project-list', component: ProjectListComponent
      },
      {
        path: 'project-detail/:projectId', component: ProjectViewDetailsComponent
      },
      {
        path: 'project-list/:statusName', component: ProjectListComponent
      },
      {
        path: 'bidder-list', component: BidderListComponent
      }
];

@NgModule({
  declarations: [ProjectListComponent, ProjectViewDetailsComponent, BidderListComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, NgbModule, NgxLoadingModule, FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectModule { }
