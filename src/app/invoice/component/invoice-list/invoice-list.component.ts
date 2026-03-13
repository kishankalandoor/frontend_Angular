import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/pagination/page';
import { CustomePaginationService } from 'src/app/shared/pagination/service/custome-pagination.service';
import { InvoiceService } from '../../service/invoice.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { UserService } from 'src/app/user/service/user.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit,OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  config = { object: {}, invoiceflag: 0 };
  textFilter: any;
  statusFilter: any;
  invoiceObject: any;
  userFlag:number;
  toDownload:boolean = false;
  startDate:any;
  endDate:any;
  inputText:any;
  filterUpdate = new Subject<string>();
  isAgency: boolean;
  clientChecked = true;
  isInvoices: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private invoiceService: InvoiceService, private userService: UserService, private customePagination: CustomePaginationService, private toaster: ToastrService) {
    this.config.invoiceflag = 0
    this.getInvoiceList();
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        console.log(value)
        console.log(value)
        this.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.invoiceService.getInvoiceList(this.page.pageable, this.statusFilter, this.textFilter,this.startDate,this.endDate)
        .subscribe(responce => {
            this.isInvoices = responce.data.content.length > 0 ? true: false;
            this.page = responce.data;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        });
    });
  }

  getInvoiceList(): any {
    this.invoiceService.getInvoiceList(this.page.pageable, this.statusFilter, this.textFilter,this.startDate,this.endDate)
      .subscribe(responce => {
        this.isInvoices = responce.data.content.length > 0 ? true: false;
          this.page = responce.data;
          this.loading = false;
          // console.log(responce.content.invoice.projectBidMap.freelancerDetails.agency);
      }, (error) => {
          this.loading = false;
      });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getInvoiceList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getInvoiceList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getInvoiceList();
  }

  public applyFilter(value): void {
    this.textFilter = value;
    this.getInvoiceList();
  }
  // public startDateFilter(value:any): void {
  //   this.page.pageable.pageNumber = 0;
  //   this.startDate = value;
  //   console.log(this.startDate)
  //   this.getInvoiceList();
  // }
  // public endDateFilter(value:any): void {
  //   this.page.pageable.pageNumber = 0;
  //   this.endDate = value;
  //   console.log(this.endDate)
  //   this.getInvoiceList();
  // }

  public startDateFilter(value: any): void {
    this.page.pageable.pageNumber = 0;
    // this.startDate = value;
    const momentDate = new Date(value); // Replace event.value with your date value
    const formattedDate = moment (momentDate).format('YYYY-MM-DD');
    console.log(formattedDate);
    this.startDate = formattedDate;

    console.log('this.startDate', this.startDate)
    this.getInvoiceList();
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
    this.getInvoiceList();

    // let dateControl = (document.getElementById('start-date') as HTMLInputElement).clear();
    // console.log('dateControl', dateControl);
  }



  public refreshPage(): void {
    window.location.reload();
  }

  public getChangeStatus(value): void {
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.statusFilter = value !== 'All' ? value : undefined;
    this.getInvoiceList();
  }

  public downloadPDF(invoiceList, agency): void{
    this.clientChecked =true;
    console.log(agency);
    if (agency){
      this.isAgency = true;
      // $('#dropdownModal2').modal('show');

    }
    else{
      this.isAgency = false;
      // $('#dropdownModal1').modal('show');

    }

    $('#dropdownModal1').modal('show');


    $('#outer-view').css("display",'none')
    console.log(invoiceList)

    this.config.object = invoiceList;
    console.log('this.config.object', this.config.object);

    this.invoiceObject = invoiceList;
    console.log('this.invoiceObject', this.invoiceObject);

    this.userFlag = this.config.invoiceflag;
    console.log('this.userFlag', this.userFlag);
    this.toDownload = false;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  getPdf(invoiceObject,invoiceflag): void {
    console.log('invoiceObject', invoiceObject);
    console.log('invoiceflag', invoiceflag);

    this.invoiceObject = invoiceObject;
    this.userFlag=invoiceflag;
    console.log('userflag', this.userFlag);
    $('#dropdownModal1').modal('hide');

    $('#outer-view').css("display","block")
    this.toDownload = true;
  }


  downloadCsv() {
    const text = this.textFilter != undefined ? this.textFilter : '';
    const status = this.statusFilter != undefined ? this.statusFilter : '';
    const start = this.startDate != undefined ? this.startDate+' 00:00:00' : '';
    const end = this.endDate != undefined ? this.endDate+' 23:59:00' : '';
    const filter = '?projectName='+text+'&invoiceStatus='
                    + status +'&fromDate='+start+'&toDate='+end;
    console.log(filter)

    if(this.isInvoices){
      this.userService.getCsv('download-invoice-list/',filter)
      .then( (res:any) => {
        this.userService.toCsvFileCreate(res, 'invoice_list')
      })
      .catch( (err) => console.log(err))
    }
    else{
      this.toaster.error("No data available")
    }
   
  }

  close(): any {
    $('#outer-view').css('display', 'block')
  }


  keyPressNumbers(event): any {
    let charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): any {
    this.filterUpdate.unsubscribe();
  }

}
