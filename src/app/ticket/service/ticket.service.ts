import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/pagination/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor( private http: HttpClient) { }

  getTicketList(pageable: Pageable, textFilter,fromDate,endDate): Observable<any> {
    const text = textFilter !== undefined ? '&projectName=' + textFilter : '';
    const dateStart = fromDate != undefined ? '&fromDate='+fromDate+' 00:00:00':'';
    const dateEnd = endDate != undefined ? '&toDate='+endDate+' 23:59:00':'';
    console.log(dateStart,dateEnd)
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&order=DESCENDING' + text+dateStart+dateEnd;
    return this.http.get<any>( environment.apiUrl + '/admin/private/admin-ticket-project-filter?' + filter);
  }

  getViewTicketDetail(ticketId): Observable<any> {
    return this.http.get<any>( environment.apiUrl + '/ticket/private/get-ticket-by-id?ticketId=' + ticketId);
  }
}
