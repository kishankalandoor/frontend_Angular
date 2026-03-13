import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/pagination/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

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

}
