import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../../shared/pagination/pageable';
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId:any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,) {
    this.userId = JSON.parse(localStorage.getItem('userInfo'))
    this.userId = this.userId.user.id;
  }

  getUserList(pageable: any, pageSize:any,textFilter, userFilter,isActive): Observable<any> {

    const usersFilter = userFilter !== undefined ? '&filterBy=' + userFilter : '';
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const filter = 'page=' + pageable + '&size=' + pageSize + '&sort=id&order=DESCENDING&isActive='+isActive+ usersFilter + text;
    return this.http.get<any>(environment.apiUrl + '/admin/private/list-users?' + filter);
  }

  triggerMailtoFreelancers(){
    return this.http.get(environment.apiUrl + '/admin/private/send-Projects-email-to-freelancers');
  }

  // getAgencyDetail(pageable: any, pageSize: any, userId): Observable<any> {
  //   const filter = 'page=' + pageable + '&size=' + pageSize + '&sort=id&order=ASCENDING&userId=' + userId;
  //   return this.http.get<any>(environment.apiUrl + '/admin/private/user-details?' + filter);
  // }


  ActivatingUser(userId) {
    return this.http.post(environment.apiUrl +'/admin/private/reactivate-user/'+userId,{}).toPromise();
  }

  deleteUser(userId): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/admin/private/delete-user/' + userId, null);
  }

  getUserDetail(userId, role): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/admin/private/user-details?userId=' + userId + '&filterBy=' + role);
  }

  agencyVerification(data) {
    return this.http.post<any>(environment.apiUrl + '/admin/private/update_agency_verification', data);

  }
  getCsv(url,filter){
    return this.http.get(environment.apiUrl + '/admin/private/'+url+ this.userId+filter).toPromise();
  }
  updateEmail(data) {
    return this.http.post(environment.apiUrl+'/admin/private/change-email-for-user',data).toPromise();
  }
  toCsvFileCreate(res, filename) {
    const arr = atob(res.data.byteArray)
    const blob = new Blob([arr], { type: 'csv/text' });
    saveAs(blob, `${filename}_${new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+'|'+new Date().getHours()+':'+new Date().getMinutes()}.csv`);
  }
}
