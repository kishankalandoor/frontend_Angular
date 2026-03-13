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
export class ClientInvitesService {

  userId: any;

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

  getRatingList(pageable: Pageable, textFilter, userFilter): Observable<any> {
    const usersFilter = userFilter !== undefined ? '&filterBy=' + userFilter : '';
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING&isActive=true' + text + usersFilter;
    return this.http.get<any>(environment.apiUrl + '/admin/private/list-users?' + filter)
  }

  getInvoiceList(pageable: Pageable, statusFilter, textFilter,startDate,endDate): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const status = statusFilter !== undefined ? '&filterBy=' + statusFilter : '';
    const dateStart = startDate !== undefined ? '&fromDate=' + startDate + ' 00:00:00' : '';
    const dateEnd = endDate !== undefined ? '&toDate=' + endDate + ' 23:59:00' : '';
    console.log(dateStart,dateEnd)
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING' + text + status + dateStart+dateEnd;
    console.log(dateEnd,dateStart)
    return this.http.get<any>( environment.apiUrl + '/admin/private/listOfInvoiceByAdmin?' + filter );
  }


  getClientInvitesDetail(pageable: Pageable, textFilter,startDate,endDate): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const dateStart = startDate !== undefined ? '&fromDate=' + startDate + ' 00:00:00' : '';
    const dateEnd = endDate !== undefined ? '&toDate=' + endDate + ' 23:59:00' : '';
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING' + text + dateStart+dateEnd;
    return this.http.get<any>(environment.apiUrl + '/admin/private/get_all_project_invitesbyclientid?' + filter);
  }
}
