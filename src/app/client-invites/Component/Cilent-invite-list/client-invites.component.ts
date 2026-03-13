import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ClientInvitesService } from '../../services/client-invites.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../user/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-client-invites',
  templateUrl: './client-invites.component.html',
  styleUrls: ['./client-invites.component.css']
})
export class ClientInvitesComponent implements OnInit, OnDestroy {
  range = new FormGroup ({
    start: new FormControl(),
    end: new FormControl()
  });

  isUsers: boolean;
  startDate: any;
  endDate: any;
  textFilter: any;
  loading = false;
  inputText: any;
  page: Page<any> = new Page();
  filterUpdate = new Subject<string>();
  today = new Date();
  minDate: Date;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  @ViewChild ('startDate') startDateInput: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(private customePagination: CustomePaginationService, private clientInvitesService: ClientInvitesService, private toastr: ToastrService,
              private userService: UserService) { }


  ngOnInit(): void {
    this.loading = true;
    this.getClientInvitesDetails();
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.loading = true;
        console.log(value)
        this.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.clientInvitesService.getClientInvitesDetail(this.page.pageable, this.textFilter,this.startDate,this.endDate)
        .subscribe(responce => {
          this.isUsers = responce.data.content.length > 0 ? true: false;
          console.log(responce);
          this.page = responce.data;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    });
    // let x = document.getElementById('start-date').min;
    // let dateControl = document.querySelector('start-date');
    // console.log('dateControl', dateControl);
  }


  getClientInvitesDetails(): void {
    this.clientInvitesService.getClientInvitesDetail(this.page.pageable, this.textFilter, this.startDate, this.endDate)
    .subscribe(responce => {
      this.isUsers = responce.data.content.length > 0 ? true: false;
        console.log(responce.data.content);
        this.page = responce.data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }

    onStartDateClick(){
      console.log('onclick works');
    }

  public startDateFilter(value: any): void {
    this.page.pageable.pageNumber = 0;
    // this.startDate = value;
    const momentDate = new Date(value); // Replace event.value with your date value
    const formattedDate = moment (momentDate).format('YYYY-MM-DD');
    console.log(formattedDate);
    this.startDate = formattedDate;

    console.log('this.startDate is here', this.startDate)
    this.getClientInvitesDetails();
  }

  public endDateFilter(value: any): void {
    // if (value < this.startDate){
    //   console.log("To date is smaller");
    // }


    this.page.pageable.pageNumber = 0;
    this.endDate = value;
    const momentDate = new Date(value); // Replace event.value with your date value
    const formattedDate = moment (momentDate).format('YYYY-MM-DD');
    console.log(formattedDate);
    this.endDate = formattedDate;
    console.log(this.endDate);
    this.getClientInvitesDetails();

    // let dateControl = (document.getElementById('start-date') as HTMLInputElement).clear();
    // console.log('dateControl', dateControl);
  }

  // keyPressNumbers(event): any {
  //   let charCode = (event.which) ? event.which : event.keyCode;
  //   // Only Numbers 0-9
  //   if ((charCode < 48 || charCode > 57)) {
  //     event.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }


  downloadCsv(): any {
    const text = this.textFilter != undefined ? this.textFilter : '';
    const start = this.startDate != undefined ? this.startDate + ' 00:00:00' : '';
    const end = this.endDate != undefined ? this.endDate + ' 23:59:00' : '';
    const filter = '?queryString=' + text + '&fromDate=' + start + '&toDate=' + end;
    console.log(filter);
    if(this.isUsers){
      this.userService.getCsv('download-invited-freelancer-list/', filter)
    .then( (res: any) => {
      this.userService.toCsvFileCreate(res, 'client_invited_list');
    })
    .catch( (err) => console.log(err));
    }
    else{
      this.toastr.error("No data available")
    }
    
  }

  public refreshPage(): void {
    window.location.reload();
  }
  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getClientInvitesDetails();

  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getClientInvitesDetails();

  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getClientInvitesDetails();

  }

   ngOnDestroy(): any {
    this.filterUpdate.unsubscribe();
  }

}
