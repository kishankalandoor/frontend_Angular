import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { UserService } from 'src/app/user/service/user.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Page } from 'src/app/shared/pagination/page';
import { ProjectService } from '../../service/project.service';
import { CustomePaginationService } from 'src/app/shared/pagination/service/custome-pagination.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-bidder-list',
  templateUrl: './bidder-list.component.html',
  styleUrls: ['./bidder-list.component.css']
})
export class BidderListComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  applyFilter = new Subject<string>();

  page: Page<any> = new Page();
  statusFilter: any;
  textFilter: any;
  url: any;
  breadCurum: any = '';
  statusHide: boolean;
  backButton: boolean;
  inputText:any;
  projectId: any;
  isPageEmpty: boolean;
  filterUpdate = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute, private userService:UserService, private projectService: ProjectService , private customePagination: CustomePaginationService) {
    this.projectId = localStorage.getItem('pid') ? localStorage.getItem('pid') : null;
    if (document.getElementById('sidebar').classList.contains('active')){
        document.getElementById('sidebar').classList.toggle('active');
    }
    this.statusHide = false;
    this.backButton = false;
    // if (this.route.snapshot.params['statusName'] !== undefined) {
    //   this.url = this.router.url;
    //   const statusName = this.route.snapshot.params['statusName'];
    //   this.breadCurum = statusName !== 'All' ? statusName  : '';
    //   this.statusFilter = statusName !== 'All' ? statusName : undefined;
    //   this.statusHide = statusName !== 'All' ? true : false;
    //   this.backButton = true;
    // }
    // this.getProjectList();
  }

  ngOnInit(): void {
    this.getBiddersList();
    this.loading = true;
    // this.filterUpdate.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged())
    //   .subscribe(value => {
    //     this.loading = true;
    //     console.log(value)
    //     this.textFilter = value;
    //     this.page.pageable.pageNumber = 0;
    //     this.projectService.getProjectList(this.page.pageable.pageNumber,this.page.pageable.pageSize, this.statusFilter, value)
    //     .subscribe(responce => {
    //       console.log(responce.data)
    //       responce.data.content.forEach(element => {
    //         switch(element.project.statusMaster.statusName) {
    //           case 'BiddingActive':
    //             element.project.statusMaster.statusName = "Bidding Active";
    //             break;
    //           case "Complete":
    //             element.project.statusMaster.statusName = "Completed";
    //             break;
    //           case "UnderDispute":
    //             element.project.statusMaster.statusName = "Under Dispute";
    //             break;
    //           case "ClosureRequest":
    //             element.project.statusMaster.statusName = "Initiated handshake";
    //             break;
    //         }
    //       });
    //       this.page = responce.data;
    //       this.loading = false;
    //     }, error => {
    //       this.loading = false;
    //     });
    // });
  }

  // getProjectList(): void {
  //   this.projectService.getProjectList(this.page.pageable.pageNumber,this.page.pageable.pageSize, this.statusFilter, this.textFilter)
  //   .subscribe(responce => {
  //     console.log(responce.data)
  //     responce.data.content.forEach(element => {
  //       switch(element.project.statusMaster.statusName) {
  //         case 'BiddingActive':
  //           element.project.statusMaster.statusName = "Bidding Active";
  //           break;
  //         case "Complete":
  //           element.project.statusMaster.statusName = "Completed";
  //           break;
  //         case "UnderDispute":
  //           element.project.statusMaster.statusName = "Under Dispute";
  //           break;
  //         case "ClosureRequest":
  //           element.project.statusMaster.statusName = "Initiated handshake";
  //           break;
  //         case "Closed":
  //             element.project.statusMaster.statusName = "Closed";
  //             break;
  //       }
  //     });
  //     this.loading = false;
  //   }, error => {
  //     this.loading = false;
  //   });
  // }
  

  getBiddersList(): any {

    let params = new HttpParams();
    params = params.append('projectId', this.projectId);
    params = params.append('page', this.page.pageable.pageNumber.toString());
    params = params.append('size', this.page.pageable.pageSize.toString());

    this.projectService.getBiddersByProjectId(params)
    .subscribe(responce => {
      console.log('get bidders list users', responce);
      this.page = responce.data;
      if(this.page.content?.length === 0){
        this.isPageEmpty = true;
      }
      else{
        this.isPageEmpty = false;
      }
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getBiddersList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getBiddersList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getBiddersList();
  }

  public getChangeStatus(value): void {
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.statusFilter = value !== 'All' ? value : undefined;
    this.getBiddersList();
  }

  public refreshPage(): void {
    if (this.router.url === this.url ){
      this.router.navigate(['/main/project/bidder-list']);
    }else{
      window.location.reload();
    }
  }
  toDownload() {
    let filter = '';
    const statusFilter = this.statusFilter != undefined ? this.statusFilter : '';
    const projectName = this.textFilter != undefined ? this.textFilter : '';
    filter = '?projectName='+projectName+'&projectStatus='+statusFilter;

    console.log(filter)
    this.userService.getCsv('download-project-list/',filter)
    .then( (res:any) => {
      this.userService.toCsvFileCreate(res,"project_list")
    })
    .catch( (err) => console.log(err))
  }

  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
