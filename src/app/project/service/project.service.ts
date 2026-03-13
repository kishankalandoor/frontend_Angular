import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../../shared/pagination/pageable';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getProjectList(pageNumber: any,pageSize:any, statusFilter, textFilter, isActive): Observable<any> {
    const status = statusFilter !== undefined ? '&projectStatus=' + statusFilter : '';
    const text = textFilter !== undefined ? '&projectTitle=' + textFilter : '';
    // tslint:disable-next-line: max-line-length
    const filter = 'page=' + pageNumber + '&size=' + pageSize + '&sort=projectId&order=DESCENDING&userId=' + this.authenticationService.authValue.id + '&isActive=' + isActive + status + text;
    return this.http.get<any>(environment.apiUrl + '/project/private/get-all-project-by-id-filter?' + filter);
    
  }

  getViewProjectDetail(projectId): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/project/private/viewProject?projectId=' + projectId);
  }

  changeProjectStatus(projectId, userId, body?): Observable<any> {
    return this.http.put<any>(environment.apiUrl + `/admin/private/updateProjectStatus?projectId=${projectId}&userId=${userId}`, body );
  }

  getBiddersByProjectId(queryParams) {

    return this.http.get<any>(environment.apiUrl + '/project/private/freelancersDetails', { params: queryParams });

    // return this.http.get<any>(`./assets/data/biddersList.json`);
  }

  deleteProject(projectId) {
    return this.http.post<any>(environment.apiUrl + '/admin/private/delete-project/' + projectId, null);
  }

  reactivateProject(projectId) {
    return this.http.post<any>(environment.apiUrl + '/admin/private/reactivate-project/' + projectId, null);
  }

}

