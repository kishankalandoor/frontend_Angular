import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/pagination/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AeromaritimeService {

  constructor(private http: HttpClient) { }

  getClientChargesList(pageable: Pageable): Observable<any> {
    const filter ='page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING';
    return this.http.get<any>( environment.apiUrl + '/client-aeromaritime-charges/private/client-charges-filter?' + filter);
  }

  saveClientCharges(body){
    return this.http.post<any>( environment.apiUrl + '/client-aeromaritime-charges/private/save-client-charges', body);
  }

  getFreelancerChargesList(pageable: Pageable): Observable<any> {
    const filter ='page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING';
    return this.http.get<any>( environment.apiUrl + '/freelancer-aeromaritime-charges/private/freelancer-charges-filter?' + filter);
  }

  saveFreelancerCharges(body){
    return this.http.post<any>( environment.apiUrl + '/freelancer-aeromaritime-charges/private/save-freelancer-charges', body);
  }
  // new api
  getFreelancerCharges() {
    return this.http.get(environment.apiUrl + '/freelancer-aeromaritime-charges/private/freelancer-charges').toPromise();
  }
  getClientCharges() {
    return this.http.get(environment.apiUrl + '/client-aeromaritime-charges/private/client-charges').toPromise();
  }

}
