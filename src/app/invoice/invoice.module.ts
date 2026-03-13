import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './component/invoice-list/invoice-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'invoice-list',
    pathMatch: 'full'
  },
  {
    path: 'invoice-list', component: InvoiceListComponent
  }
];

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, FormsModule, ReactiveFormsModule, NgxLoadingModule,
    MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
