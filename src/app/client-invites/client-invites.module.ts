import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { ClientInvitesComponent } from './Component/Cilent-invite-list/client-invites.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';




const routes: Routes = [
    {
      path:'',
      redirectTo : 'client-invites-list',
      pathMatch: 'full'
    },
    {
      path: 'client-invites-list', component: ClientInvitesComponent
    }
];


@NgModule({
  declarations: [ClientInvitesComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, NgbModule, NgxLoadingModule,
    FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientInvitesModule { }
