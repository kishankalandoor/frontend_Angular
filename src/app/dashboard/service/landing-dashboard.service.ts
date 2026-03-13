import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingDashboardService {

  constructor(private http: HttpClient) { }

  getAdminDashboard(): Observable<any> {
    return this.http.get(environment.apiUrl + '/admin/private/admin-dashboard-count/1');
  }

}
