import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class BaseAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.authenticationService.authValue;
    const isLoggedIn = user && user.accessToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isApiUrl && isLoggedIn){
      request = request.clone({
        setHeaders: {
            Authorization: user.tokenType + ' ' + user.accessToken
        }
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
