import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public errorMessage: string;

  constructor(private router: Router, private authenticationService: AuthenticationService,private toaster:ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      
      if (err.status === 500 && this.authenticationService.authValue){
        const error = err.error.message;
        this.router.navigate(['404',"Sorry Something Went Wrong."]);
        sessionStorage.setItem("responseError",'true')
        // this.toaster.error('Sorry Something Went Wrong.');
        console.log(error)
      }
      else if (err.status === 400 && this.authenticationService.authValue){
        const error = err.error.message;
        this.router.navigate(['404',"Sorry Something Went Wrong."]);
        sessionStorage.setItem("responseError",'true')
        // this.toaster.error('Sorry Something Went Wrong.');
        console.log(error)
      }
      else if (err.status === 404 && this.authenticationService.authValue){
        console.log("page not found")
        this.router.navigate(['404',"Sorry Something Went Wrong."]);
        const error = err.error.message;
        // this.router.navigate(['/main/error-500',error]);
        this.toaster.error(error);

      } else if (err.status === 401 && this.authenticationService.authValue) {

          if (this.authenticationService.authValue.refreshToken  !== ''){
                this.authenticationService.refreshToken().pipe(first())
                .subscribe({
                    next: () => {
                        this.authenticationService.getUserLoginDetail()
                        .subscribe(responce => {
                          this.authenticationService.authValue.id = responce.data.user.id
                          this.authenticationService.authValue.email = responce.data.user.email;
                          localStorage.setItem('token',JSON.stringify(this.authenticationService.authValue))
                        },
                        );
                    },
                  }
                );    
          } else{
                this.authenticationService.logout();
          }

      }else{
        this.handleOtherError(err);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

  private handleOtherError = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }

}
