import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './component/ticket-list/ticket-list.component';
import { TicketViewDetailComponent } from './component/ticket-view-detail/ticket-view-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
      {
        path:'',
        redirectTo : 'ticket-list',
        pathMatch: 'full'
      },
      {
        path: 'ticket-list', component: TicketListComponent
      },
      {
        path: 'ticket-detail/:ticketId', component: TicketViewDetailComponent
      }
];

@NgModule({
  declarations: [TicketListComponent, TicketViewDetailComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule,FormsModule, NgxLoadingModule,
    RouterModule.forChild(routes)
  ]
})
export class TicketModule { }
