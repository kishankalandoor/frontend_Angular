import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../../shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class InquirieListService {

  constructor(private http: HttpClient) { }

  getInquiriesList(pageable: Pageable,textFilter,statusFilter): Observable<any>{
    const filterStatus = statusFilter != undefined ? statusFilter : '';
    const filterText = textFilter != undefined ? textFilter : '';
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize;
    return this.http.get<any>(environment.apiUrl + '/admin-ticket/private/admin-ticket-filter?'+filter+'&filterBy='+filterStatus+'&queryString='+filterText);
  }
  getList() {
    return this.http.get<any>(environment.apiUrl + '/user/public/admin-ticket-master').toPromise();
  }

}
