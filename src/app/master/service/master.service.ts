import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../../shared/pagination/pageable';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getCategoryList(pageable: Pageable, flag, textFilter, categoryFilter): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const category = categoryFilter !== undefined ? '&filterBy=' + categoryFilter : '';
    const filter = flag === 1 ? 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + category + '&sort=id&order=DESCENDING' : '';
    console.log(filter, category);
    return this.http.get<any>( environment.apiUrl + '/category/private/category-filter-admin?' + filter  + text);
  }


  getSubCategoryList(pageable: Pageable, textFilter, subCategoryFilter): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const subCategory = subCategoryFilter !== undefined ? '&filterBy=' + subCategoryFilter : '';
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + subCategory + '&sort=id&order=DESCENDING' + text;
    return this.http.get<any>( environment.apiUrl + '/sub-category/private/sub-category-filter-admin?' + filter);
  }

  getTagList(pageable: Pageable, flag, textFilter, tagFilter): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const tag = tagFilter !== undefined ? '&filterBy=' + tagFilter : '';
    const filter = flag === 1 ? 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + tag + '&sort=id&order=DESCENDING' : '';
    return this.http.get<any>( environment.apiUrl + '/tags/private/tag-filter-admin?' + filter + text);
  }

  getSubTagList(pageable: Pageable, textFilter, subTagFilter): Observable<any> {
    const text = textFilter !== undefined ? '&queryString=' + textFilter : '';
    const subTag = subTagFilter !== undefined ? '&filterBy=' + subTagFilter : '';
    const filter = 'page=' + pageable.pageNumber + '&size=' + pageable.pageSize + subTag + '&sort=id&order=DESCENDING' + text;
    return this.http.get<any>( environment.apiUrl + '/tagvalue/private/tagvalue-filter-admin?' + filter);
  }

  saveCategory(body): Observable<any>{
    return this.http.post<any>( environment.apiUrl + '/category/private/save-category', body);
  }

  saveSubCategory(body): Observable<any>{
    return this.http.post<any>( environment.apiUrl + '/sub-category/private/save-sub-category', body);
  }

  saveTag(body): Observable<any>{
    return this.http.post<any>( environment.apiUrl + '/tags/private/save-tag', body);
  }

  saveSubTag(body): Observable<any>{
    return this.http.post<any>( environment.apiUrl + '/tagvalue/private/save-tagvalue', body);
  }

}
