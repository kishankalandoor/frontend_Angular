import { Component, OnDestroy, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject } from 'rxjs/internal/Subject';
import { Page } from 'src/app/shared/pagination/page';
import { CustomePaginationService } from 'src/app/shared/pagination/service/custome-pagination.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit,OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  textFilter: any;
  startDate:any;
  endDate:any;
  inputText:any;
  filterUpdate = new Subject<string>();

  constructor(private ticketService: TicketService, private customePagination: CustomePaginationService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    this.getTicketList();
  }

  ngOnInit(): void {
    this.loading = true;
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        console.log(value)
        this.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.ticketService.getTicketList(this.page.pageable, this.textFilter,this.startDate,this.endDate)
        .subscribe(responce => {
            this.page = responce.data;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        });
    });
  }

  getTicketList(): any {
    this.ticketService.getTicketList(this.page.pageable, this.textFilter,this.startDate,this.endDate)
      .subscribe(responce => {
          this.page = responce.data;
          this.loading = false;
      }, (error) => {
          this.loading = false;
      });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getTicketList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getTicketList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getTicketList();
  }

  public applyFilter(value): void {
    this.page.pageable.pageNumber = 0
    this.textFilter = value;
    this.getTicketList();
  }

  public refreshPage(): void {
    window.location.reload();
  }
  public startDateFilter(value:any): void {
    this.page.pageable.pageNumber = 0;
    this.startDate = value;
    console.log(this.startDate)
    this.getTicketList();
  }
  public endDateFilter(value:any): void {
    this.page.pageable.pageNumber = 0;
    this.endDate = value;
    console.log(this.endDate)
    this.getTicketList();
  }
  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
