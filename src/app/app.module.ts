import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginAuthModule } from './login-auth/login-auth.module';
import { InquirieModule } from './inquirie/inquirie.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MasterModule } from './master/master.module';
import { ProjectModule } from './project/project.module';
import { RateReviewModule } from './rate-review/rate-review.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { AeromaritimeChargesModule } from './aeromaritime-charges/aeromaritime-charges.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ClientInvitesModule } from './client-invites/client-invites.module';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
   ],
  imports: [AppRoutingModule,
  BrowserModule, BrowserAnimationsModule, ClientInvitesModule,
     LayoutModule, DashboardModule, LoginAuthModule, InquirieModule, InvoiceModule, MasterModule,
    ProjectModule, RateReviewModule, TicketModule, UserModule, AeromaritimeChargesModule, NgxLoadingModule, FormsModule,
    SharedModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
