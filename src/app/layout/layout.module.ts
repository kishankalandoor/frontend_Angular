import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './component/layout/layout.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../login-auth/interceptor/auth.guard';
import { InternalErrorComponent} from '../shared/internal-error/internal-error.component';
import { PageErrorComponent } from '../shared/page-error/page-error.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
      },
      {
        path: 'inquirie',
        loadChildren: () => import('../inquirie/inquirie.module').then(m => m.InquirieModule), canActivate: [AuthGuard]
      },
      {
        path: 'invoice',
        loadChildren: () => import('../invoice/invoice.module').then(m => m.InvoiceModule), canActivate: [AuthGuard]
      },
      {
        path: 'master',
        loadChildren: () => import('../master/master.module').then(m => m.MasterModule), canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: () => import('../project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard]
      },
      {
        path: 'rating',
        loadChildren: () => import('../rate-review/rate-review.module').then(m => m.RateReviewModule), canActivate: [AuthGuard]
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketModule), canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]
      },
      {
        path: 'client-invites',
        loadChildren: () => import('../client-invites/client-invites.module').then(m => m.ClientInvitesModule), canActivate: [AuthGuard]
      },
      {
        path: 'aeromaritimeCharges',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('../aeromaritime-charges/aeromaritime-charges.module').then(m => m.AeromaritimeChargesModule), canActivate: [AuthGuard]
      },
      {
        path: 'error-404/:err', component: PageErrorComponent
      },
      {
        path: 'error-500/:err', component: InternalErrorComponent
      }
    ]
  }
];


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
