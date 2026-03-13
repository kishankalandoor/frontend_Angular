import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';

@Component({
  selector: 'app-project-view-details',
  templateUrl: './project-view-details.component.html',
  styleUrls: ['./project-view-details.component.css']
})
export class ProjectViewDetailsComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  projectDetail: any;
  projectDocumentList: [];
  skills:any = [];
  @Input() currentRate: any;
  @Input() currentFreelancerRate: any;

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService, private authenticationService: AuthenticationService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loading = true;
    this.getProjectDetail(this.route.snapshot.params['projectId']);
  }

  // closeProject(projectId): any{

  //   const userId = this.authenticationService.authValue.id;
  //   const body = {status: "Completed" };


  //   this.projectService.changeProjectStatus(projectId, userId, body ).subscribe(
  //     response => {
  //       this.getProjectDetail(projectId);
  //       console.log(response.data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  //   // userId: this.authenticationService.authValue.id;

  // }

  closeProject(projectId): any{
    const userId = this.authenticationService.authValue.id;
    // const body = {status: "Completed" };
    Swal.fire({
      title: 'Are you sure you want to resolve the project? ',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF4D00',
      confirmButtonColor: '#3BD4AE',
      confirmButtonText: 'Yes, resolve it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.projectService.changeProjectStatus(projectId, userId).subscribe(
          response => {
            this.toastr.success( 'Project resolved sucessfully');
            this.getProjectDetail(projectId);
            console.log(response.data);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  getProjectDetail(projectId): any {
    this.projectService.getViewProjectDetail(projectId)
    .subscribe(responce => {
        // localStorage.setItem('pid', responce.data.projectEntity.projectId);
        this.projectDetail = responce.data;
        console.log(responce.data)
        let tempArr = [];
          // If conditions for make array to create list of skills-------------------
          if(responce.data.categoryList.length) {
            tempArr = responce.data.categoryList.map( element => element.categoryName)
            this.skills = this.skills.concat(tempArr)
            console.log(this.skills)
          }
          if (responce.data.subCategoryList.length) {
            tempArr = responce.data.subCategoryList.map( element => element.categoryName)
            this.skills = this.skills.concat(tempArr);
            console.log(this.skills)
          }
          if (responce.data.tagValueList.length) {
            tempArr = responce.data.tagValueList.map( element => element.tagValue)
            this.skills = this.skills.concat(tempArr);
            console.log(this.skills)
          }
          if (responce.data.tagsEntityList.length) {
            tempArr = responce.data.tagsEntityList.map( element => element.name)
            this.skills = this.skills.concat(tempArr);
            console.log(this.skills)
          }
        // switch case to rename the strings of api response--------------------
        switch(this.projectDetail.projectEntity.statusMaster.statusName) {
          case 'BiddingActive':
            this.projectDetail.projectEntity.statusMaster.statusName = "Bidding Active";
            break;
          case "Complete":
            this.projectDetail.projectEntity.statusMaster.statusName = "Completed";
            break;
          case "UnderDispute":
            this.projectDetail.projectEntity.statusMaster.statusName = "Under Dispute";
            break;
          case "ClosureRequest":
            this.projectDetail.projectEntity.statusMaster.statusName = "Initiated handshake";
            break;
        }
        this.projectDocumentList = responce.data.projectDocumentList;
        if (this.projectDetail.projectEntity.clientDetails.averageRating !== undefined && this.projectDetail.projectEntity.clientDetails.averageRating !== null){
          this.currentRate =  this.projectDetail.projectEntity.clientDetails.averageRating;
        }
        if (this.projectDetail.projectEntity.freelancer?.averageRating !== undefined && this.projectDetail.projectEntity.freelancer?.averageRating !== null){
          this.currentFreelancerRate =  this.projectDetail.projectEntity.freelancer.averageRating;
        }
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  toBidderListPage(){
    localStorage.setItem('pid', this.projectDetail.projectEntity.projectId);
    this.router.navigate(['/main/project/bidder-list']);
  }
}
