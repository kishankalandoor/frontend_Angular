import { Sort } from './sort';

export class Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;

  // tslint:disable-next-line: member-ordering
  static readonly DEFAULT_PAGE_SIZE = 100;
  // tslint:disable-next-line: member-ordering
  static readonly FIRST_PAGE_NUMBER = 0;

  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
}
