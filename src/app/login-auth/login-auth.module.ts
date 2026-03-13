import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { RequestPasswordComponent } from './component/request-password/request-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BaseAuthInterceptor } from './interceptor/base-auth.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'request-password', component: RequestPasswordComponent
      },
      {
        path: 'reset-password', component: ResetPasswordComponent
      }
];

@NgModule({
  declarations: [LoginComponent, RequestPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ToastrModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class LoginAuthModule { }
