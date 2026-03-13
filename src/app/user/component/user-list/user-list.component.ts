import { Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  textFilter: any;
  newEmail: any;
  email: any;
  userId: any;
  isActivatedAccount: boolean = true;
  AdminUser: any = JSON.parse(localStorage.getItem('userInfo'));
  inputText: any;
  filterUpdate = new Subject<string>();
  isFreelancer = false;
  isAgency = false;
  isUsers: boolean;
  config = {
    url: '', breadcrumb: 'User', userTypeHide: false, backButton: false, UserRole: false, userFilter: ''
  };
  mailValid: boolean = false;


  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private customePagination: CustomePaginationService, private toaster:ToastrService, private userService: UserService) {
    if (this.route.snapshot.params['userType'] !== undefined) {
      this.config.url = this.router.url;
      console.log(this.config.url);
      const userType = this.route.snapshot.params['userType'];
      console.log('userType', userType);
      if(userType === 'Company'){
        this.isAgency = true;
      }
      this.config.userFilter = userType !== 'All' ? userType : '';
      console.log(this.config.userFilter);
      this.config.breadcrumb = userType !== 'All' ? userType !== 'Client' ? userType : 'Client' : 'User';
      console.log(this.config.breadcrumb);
      this.config.userTypeHide = userType !== 'All' ? true : false;
      console.log(this.config.userTypeHide);
      this.config.backButton = true;
    }
    this.getUserList();
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }

  }

  ngOnInit(): void {
    console.log('this.isAgency', this.isAgency);

    this.loading = true;
    console.log(this.AdminUser);
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        console.log('filter update', value)
        this.textFilter = value;
        this.userService.getUserList(0, this.page.pageable.pageSize, this.textFilter, this.config.userFilter, this.isActivatedAccount)
        .subscribe(responce => {
            this.page = responce.data;
            if(responce.data.content.length > 0){
              this.isUsers = true
            }
            else{
              this.isUsers = false;
            }
            console.log('page content', this.page);
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    });
  }

  onEditEmail(email, userid): any {
    this.email = email;
    this.userId = userid;
    $('#myModal').modal('show');
  }

  public setNewEmail(value): void {
    this.getUserList();
    const pattern = /\S+@\S+\.\S+/;
    if (pattern.test(value)) {
      this.mailValid = true;
    }
    else {
      this.mailValid = false;
    }
    console.log(this.mailValid)
  }

  public onUpdateEmail(): void{
    console.log(this.email,this.newEmail)
    this.userService.updateEmail({
      adminUserId: this.AdminUser.user.id,
      oldEmail: this.email,
      newEmail: this.newEmail,
    }).then( response => {
      console.log(response);
      this.getUserList();
      this.newEmail = null;
      this.toaster.success("Email ID Changed successfully.")
      $('#myModal').modal('hide');
    })
    .catch( err => {
      console.log(err)
      this.newEmail = null;
      this.mailValid=false;
    })
  }


  getUserList(): any {
    this.userService.getUserList(this.page.pageable.pageNumber,this.page.pageable.pageSize, this.textFilter, this.config.userFilter,this.isActivatedAccount)
    .subscribe(responce => {
      console.log('get user list', responce);
      if(responce.data.content.length > 0){
        this.isUsers = true
      }
      else{
        this.isUsers = false;
      }
      this.page = responce.data;
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getUserList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getUserList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getUserList();
  }

  public getAgency(value): any{
    this.isAgency = !this.isAgency;
    console.log('this.isAgency', this.isAgency)

    if(this.isAgency === true){
    this.loading = true;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.userFilter = value !== 'All' ? value : '';
    console.log('A',this.config.userFilter);
    this.config.UserRole = value !== 'All' ? true : false;
    console.log('B', this.config.UserRole);
    this.getUserList();
    }
    else{
      const val = 'FREELANCER';
      this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
      this.config.userFilter = val;
      console.log('A', this.config.userFilter);
      this.config.UserRole = true;
      console.log('B', this.config.UserRole);
      this.getUserList();
    }



  }



  public getChangeUser(value): void {
    // console.log(value);
    if (value === 'Freelancer'){
      this.isFreelancer = true;
    }
    else{
      this.isFreelancer = false;
    }
    this.loading = true;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.userFilter = value !== 'All' ? value : '';
    console.log('A',this.config.userFilter);
    this.config.UserRole = value !== 'All' ? true : false;
    console.log('B', this.config.UserRole);

    this.getUserList();
  }
  public refreshPage(): void {
    if (this.router.url === this.config.url ){
      this.router.navigate(['/main/user/user-list']);
    }else{
      window.location.reload();
    }
  }

  deleteUser(userName, userId): any{
    console.log(userId)
    Swal.fire({
      title: 'Are you sure? inactive the ' + userName + ' User!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF4D00',
      confirmButtonColor: '#3BD4AE',
      confirmButtonText: 'Yes, inactivate it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(userId).subscribe(responce => {
          Swal.fire('Inactived!', 'Your ' + userName + ' User  has been inactivated.', 'success');
          this.getUserList();
        }, error => {
          console.log(error);
        });
      }
    });
  }
  reActivatingUser(userId) {
    console.log(userId)
    this.userService.ActivatingUser(userId)
    .then( (res) => {
      console.log(res)
      this.toaster.success("Account Reactived successfully.")
      this.getUserList()
    })
    .catch( (err) => {
      console.log(err)
    })
  }
  changeUserType() {
    this.isActivatedAccount = !this.isActivatedAccount;
    this.page.pageable.pageNumber = 0;
    this.loading = true;
    this.getUserList();
  }
  toDownload(): any {
    let filter = ''
    if(this.textFilter) {
      filter = '?filterBy='+this.config.userFilter+'&name='+this.textFilter+'&isActive='+this.isActivatedAccount
    }
    else {
      filter = '?filterBy='+this.config.userFilter+'&isActive='+this.isActivatedAccount
    }
    if(this.isUsers){
      console.log(filter);
    this.userService.getCsv('download-users-list/',filter)
    .then( (res:any) => {
      console.log(res);
      this.userService.toCsvFileCreate(res,"user_list")
    })
    .catch( (err) => console.log(err))
    }
    else {
      this.toaster.error("No data available")
    }

  }


  triggerEmail(): any{
    Swal.fire({
      title: 'Are you sure you want to send email to all the Service Providers ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF4D00',
      confirmButtonColor: '#3BD4AE',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.userService.triggerMailtoFreelancers().subscribe(responce => {
          Swal.fire('Sent!', 'Email sent sucessfully' , 'success');
          this.loading = false;

        }, error => {
          console.log(error);
        });
      }
    });
  }



  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
