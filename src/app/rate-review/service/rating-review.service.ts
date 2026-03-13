import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pageable } from 'src/app/shared/pagination/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingReviewService {

  constructor(private http:HttpClient) { }
  private user = new BehaviorSubject<string>('');
  castrating = this.user.asObservable(); // is for sending the review object to individual rating component.

  getRatingList(pageable: Pageable, textFilter, userFilter): Observable<any> {
    const usersFilter = userFilter !== undefined ? '&filterBy=' + userFilter : '';
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    // tslint:disable-next-line:max-line-length
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING&isActive=true' + text + usersFilter;
    return this.http.get<any>(environment.apiUrl + '/admin/private/list-users?' + filter)
  }


  getViewIndividualRating(pageable: Pageable, userId, role): Observable<any> {
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + '&sort=id&order=DESCENDING&userId=' + userId + '&filterBy=' + role;
    return this.http.get<any>(environment.apiUrl + '/rating-and-review/private/get-rating-and-review?' + filter);
  }


  checkViewIndividualRating( userId, role): Observable<any> {

    console.log('this is api id', userId);
    console.log('this is api role', role);
    const filter = 'page=' + 0 + '&size=' + 10 + '&sort=id&order=DESCENDING&userId=' + userId + '&filterBy=' + role ;
    return this.http.get<any>(environment.apiUrl + '/rating-and-review/private/get-rating-and-review?' + filter);
  }




  userRating(rating){
    this.user.next(rating);
  }
  deleteReview(data) {
    return this.http.post(environment.apiUrl +'/rating-and-review/private/delete-rating-and-review', data).toPromise();
  }
}
