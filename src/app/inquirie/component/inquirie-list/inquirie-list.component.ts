import { Component, OnInit } from '@angular/core';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { InquirieListService } from '../../service/inquirie-list.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { UserService } from 'src/app/user/service/user.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inquirie-list',
  templateUrl: './inquirie-list.component.html',
  styleUrls: ['./inquirie-list.component.css']
})
export class InquirieListComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  textFilter: any;
  statusFilter: any;
  dropDownItems: any;
  isInquiries: boolean;


  constructor(private customePagination: CustomePaginationService,
              private userService: UserService, private inquiriesService: InquirieListService, private toaster: ToastrService) {
    this.getInquiriesList();
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
  }

  ngOnInit(): void {
    // this.getInquiriesList();
    this.loading = true;
    this.inquiriesService.getList()
    .then( (res) => {
      console.log(res);
      this.dropDownItems = res.data.content;
    })
    .catch( (err) => {
      console.log(err)
    })
    // const element = document.getElementById('search')
    // const result = fromEvent(element,'keyup')
    // result.pipe(
    //   map((e:any) => e.currentTarget.value),
    //   debounceTime(500)
    // )
    // .subscribe ( (value) => {
    //   console.log(value)
    //   this.textFilter = value;
    //   this.loading = true;
    //   this.page.pageable.pageNumber = 0;
    //   this.inquiriesService.getInquiriesList(this.page.pageable,this.textFilter,this.statusFilter)
    //   .subscribe(responce => {
    //       console.log(responce)
    //       this.page = responce.data;
    //       this.loading = false;
    //   }, error => {
    //       this.loading = false;
    //   });
    // })
  }
  getChangeStatus(value) {
    this.loading = true;
    console.log(value)
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.statusFilter = value !== 'All' ? value : undefined;
    this.getInquiriesList();
  }

  getInquiriesList(): void {
    this.inquiriesService.getInquiriesList(this.page.pageable,this.textFilter,this.statusFilter)
    .subscribe(responce => {
        this.isInquiries = responce.data.content.length > 0 ? true: false;
        console.log(responce)
        this.page = responce.data;
        this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getInquiriesList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getInquiriesList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getInquiriesList();
  }

  public refreshPage(): void {
    window.location.reload();
  }
  toDownload() {
    const filterStatus = this.statusFilter != undefined ? this.statusFilter : '';
    const filterText = this.textFilter != undefined ? this.textFilter : '';
    const params = '?filterBy='+filterStatus+'&queryString='+filterText;

    if(this.isInquiries){
      this.userService.getCsv('download-inquiries-list/',params)
    .then( (res:any) => {
      this.userService.toCsvFileCreate(res,"inquiries_list")
    })
    .catch( (err) => console.log(err))
    }
    else{
      this.toaster.error("No data available")
    }
    
  }

}
