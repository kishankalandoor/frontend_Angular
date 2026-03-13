import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page } from '../../../shared/pagination/page';
import { ProjectService } from '../../service/project.service';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { UserService } from 'src/app/user/service/user.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit,OnDestroy {

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
  isActivatedAccount = true;
  inputText:any;
  isActivatedProject: boolean = true;
  isProjects: boolean;
  filterUpdate = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute, private userService:UserService, private projectService: ProjectService, private customePagination: CustomePaginationService,  private toaster: ToastrService) {
    if (document.getElementById('sidebar').classList.contains('active')){
        document.getElementById('sidebar').classList.toggle('active');
    }
    this.statusHide = false;
    this.backButton = false;
    if (this.route.snapshot.params['statusName'] !== undefined) {
      this.url = this.router.url;
      const statusName = this.route.snapshot.params['statusName'];
      this.breadCurum = statusName !== 'All' ? statusName  : '';
      this.statusFilter = statusName !== 'All' ? statusName : undefined;
      this.statusHide = statusName !== 'All' ? true : false;
      this.backButton = true;
    }
    this.getProjectList();
  }

  ngOnInit(): void {
    this.loading = true;
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.loading = true;
        console.log(value)
        this.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.projectService.getProjectList(this.page.pageable.pageNumber,this.page.pageable.pageSize, this.statusFilter, value, this.isActivatedProject)
        .subscribe(responce => {
          this.isProjects = responce.data.content.length > 0 ? true: false;
          console.log(responce.data)
          responce.data.content.forEach(element => {
            switch(element.project.statusMaster.statusName) {
              case 'BiddingActive':
                element.project.statusMaster.statusName = "Bidding Active";
                break;
              case "Complete":
                element.project.statusMaster.statusName = "Completed";
                break;
              case "UnderDispute":
                element.project.statusMaster.statusName = "Under Dispute";
                break;
              case "ClosureRequest":
                element.project.statusMaster.statusName = "Initiated handshake";
                break;
            }
          });
          this.page = responce.data;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    });
  }

  getProjectList(): void {
    this.projectService.getProjectList(this.page.pageable.pageNumber,this.page.pageable.pageSize, this.statusFilter, this.textFilter, this.isActivatedProject)
    .subscribe(responce => {
      this.isProjects = responce.data.content.length > 0 ? true: false;
      console.log(responce.data)
      responce.data.content.forEach(element => {
        switch(element.project.statusMaster.statusName) {
          case 'BiddingActive':
            element.project.statusMaster.statusName = "Bidding Active";
            break;
          case "Complete":
            element.project.statusMaster.statusName = "Completed";
            break;
          case "UnderDispute":
            element.project.statusMaster.statusName = "Under Dispute";
            break;
          case "ClosureRequest":
            element.project.statusMaster.statusName = "Initiated handshake";
            break;
          case "Closed":
              element.project.statusMaster.statusName = "Closed";
              break;
        }
      });
      this.page = responce.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getProjectList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getProjectList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getProjectList();
  }

  public getChangeStatus(value): void {
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.statusFilter = value !== 'All' ? value : undefined;
    this.getProjectList();
  }

  public refreshPage(): void {
    if (this.router.url === this.url ){
      this.router.navigate(['/main/project/project-list']);
    }else{
      window.location.reload();
    }
  }
  toDownload() {
    let filter = '';
    const statusFilter = this.statusFilter != undefined ? this.statusFilter : '';
    const projectName = this.textFilter != undefined ? this.textFilter : '';
    filter = '?projectName='+projectName+'&projectStatus='+statusFilter + '&isActive='+this.isActivatedProject;

    // console.log(filter)
    if(this.isProjects){
      this.userService.getCsv('download-project-list/',filter)
    .then( (res:any) => {
      this.userService.toCsvFileCreate(res,"project_list")
    })
    .catch( (err) => console.log(err))
    }
    else{
      this.toaster.error("No data available")
    }
    
  }

  changeUserType() {
    this.isActivatedAccount = !this.isActivatedAccount;
    this.page.pageable.pageNumber = 0;
    // this.loading = true;

  }

  deleteProject(projectId, projectName ): any{
    console.log(projectId)
    Swal.fire({
      title: 'Are you sure? inactivate the ' + projectName + ' project!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF4D00',
      confirmButtonColor: '#3BD4AE',
      confirmButtonText: 'Yes, inactivate it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.projectService.deleteProject(projectId).subscribe(responce => {
          Swal.fire('Inactived!', 'Your ' + projectName + ' Project has been inactivated.', 'success');
          this.getProjectList();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  reActivatingUser(projectId): any {
    console.log(projectId)
    this.projectService.reactivateProject(projectId)
    .subscribe( (res) => {
      console.log(res)
      this.toaster.success("Project Reactived successfully.")
      this.getProjectList();
    })
    err => {
      console.log(err)
    }
  }


  changeProjectType() {
    this.isActivatedProject = !this.isActivatedProject;
    this.page.pageable.pageNumber = 0;
    this.loading = true;
    this.getProjectList();
  }



  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
