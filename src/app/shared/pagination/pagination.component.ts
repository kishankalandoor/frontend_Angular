import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Page } from './page';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: Page<any>;
  @Output() nextPageEvent = new EventEmitter();
  @Output() previousPageEvent = new EventEmitter();
  @Output() pageSizeEvent: EventEmitter<number> = new EventEmitter<number>();
  // tslint:disable-next-line: no-inferrable-types
  customPageNumber: number;

  constructor() {
  }

  ngOnInit(): void {

  }

  nextPage(): void {
    this.nextPageEvent.emit(null);
  }

  previousPage(): void {
    this.previousPageEvent.emit(null);
  }

  updatePageSize(pageSize: number): void {
    this.pageSizeEvent.emit(pageSize);
  }

  firstPage(firstPage: number): void {
    this.pageSizeEvent.emit(firstPage);
  }

  lastPage(lastPage: number): void {
    this.pageSizeEvent.emit(lastPage);
  }

  counter(i: number): any {
    return new Array(i);
  }

  findPage(pageSize: number): void {
    if (pageSize < 1 || pageSize === undefined){
      this.customPageNumber = 1;
      this.pageSizeEvent.emit(0);
    } else if (pageSize > this.page.totalPages){
      this.customPageNumber =  this.page.totalPages;
      this.pageSizeEvent.emit(this.customPageNumber - 1);
    } else {
      this.pageSizeEvent.emit(pageSize - 1);
    }
  }
}

