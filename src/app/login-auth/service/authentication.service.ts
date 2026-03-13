import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Oauth } from '../../shared/modal/oauth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authSubject: BehaviorSubject<Oauth>;
  public auth: Observable<Oauth>;

  constructor(private http: HttpClient,  private router: Router) {
    this.authSubject = new BehaviorSubject<Oauth>(JSON.parse(localStorage.getItem('token')));
    this.auth = this.authSubject.asObservable();
  }

  public get authValue(): any {
    return this.authSubject.value;
  }

  login(formData): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/login', formData)
        .pipe(map(response => {
            localStorage.setItem('token', JSON.stringify(response));
            this.authSubject.next(response);
            return response;
        }));
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.authSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): any {
    const refreshToken = this.authValue.refreshToken;
    this.authSubject.next(null);
    return this.http.post<any>(environment.apiUrl + '/auth/refresh-access-token?data=Bearer ' + refreshToken, null)
        .pipe(map((response) => {
            localStorage.setItem('token', JSON.stringify(response));
            this.authSubject.next(response);
            return response;
        }));
  }

  requestPassword(username): any {
    return this.http.get<any>(environment.apiUrl + '/user/public/forgot-password?email=' + username);
  }

  resetPassword(username, oldpassword, newpassword):  Observable<any> {
    const body = {email: username, oldPassword: oldpassword, newPassword: newpassword};
    return this.http.post<any>(environment.apiUrl + '/user/private/change-password', body);
  }

  getUserLoginDetail(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + '/user/private/get-user-information');
  }
}
