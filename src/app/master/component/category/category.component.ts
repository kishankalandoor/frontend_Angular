import { Component, OnDestroy, OnInit  } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

import { debounceTime, map } from 'rxjs/operators';
import { fromEvent,Subject} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  isCategoryList: boolean;
  // public categoryFilter: any = '';

  page: Page<any> = new Page();
  config = {
    name : 'Industry', flag: 0, createorUpdateFlag: 0, object: {}, textFilter: undefined, categoryFilter: undefined,
  };
  error = false;
  categoryName: any;
  inputText:any;
  filterUpdate = new Subject<string>();

  constructor(private masterService: MasterService, private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    this.getCategoryList();
  }

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.getCategoryList();
  // }

  ngOnInit(): void {
    this.loading = true;
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        console.log(value)
        this.config.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.masterService.getCategoryList(this.page.pageable, 1, this.config.textFilter, this.config.categoryFilter)

        .subscribe(responce => {
            this.isCategoryList = responce.data.content.length > 0 ? true : false;
            this.page = responce.data;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        });
    });
  }



  getCategoryList(): any {
   this.masterService.getCategoryList(this.page.pageable, 1, this.config.textFilter, this.config.categoryFilter)
    .subscribe(responce => {
      this.isCategoryList = responce.data.content.length > 0 ? true : false;
      console.log(responce);
      this.page = responce.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getCategoryList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getCategoryList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getCategoryList();
  }

  public applyFilter(value): void {
    this.config.textFilter = value;
    this.getCategoryList();
  }

  public refreshPage(): void {
      window.location.reload();
  }

  public create(): void {
      this.categoryName = '';
      this.config.createorUpdateFlag = 0;
      $('#myModal').modal('show');
  }

  public saveValue(name): void{
    if (name === ''){
      this.error = true;
      setTimeout(function() { this.error = false; }.bind(this), 3000);
      return;
    }

    const body = { categoryName: name, isActive: true, userId: this.authenticationService.authValue.id };

    if(name.length <= 100){
      if(!name.match('[0-9]+')){
        this.masterService.saveCategory(body).pipe(first())
        .subscribe({
          next: () => {
              this.categoryName = '';
              $('#myModal').modal('hide');
              this.toastr.success( name + ' Successfully Created.');
              this.getCategoryList();
          }, error: error => {
              this.categoryName = '';
              $('#myModal').modal('hide');
              // this.toastr.error('Something went to error');
          }
        }
      );
    }
    else{
      this.toastr.error('Numeric value not allowed in Industry name');
    }
  }else{
      this.toastr.error('100 character only allowed in the Industry name');
  }

}

  public onChange(category, value): void{
    console.log(category);
    console.log(value);
    const body = { id: category.id, categoryName: category.categoryName, isActive: value, userId: this.authenticationService.authValue.id };
    this.masterService.saveCategory(body).pipe(first())
    .subscribe((response) => {
        if(value){
          this.toastr.success( category.categoryName + ' is Active');
          this.getCategoryList();
        }
        else{
          this.toastr.success( category.categoryName + ' is Inactive');
          this.getCategoryList();
        }

    }, error => {
        this.toastr.error(error);
    });
  }

  public edit(category): void {
      this.config.createorUpdateFlag = 1;
      this.config.object = category;
      this.categoryName = category.categoryName;
      $('#myModal').modal('show');
  }

  public updateValue(category, name): any {
    const body = { id: category.id, categoryName: name, isActive: category.active, userId: this.authenticationService.authValue.id };
    if(name.length <= 100){
      if(!name.match('[0-9]+')){
        this.masterService.saveCategory(body).pipe(first())
        .subscribe(() => {
            this.categoryName = '';
            $('#myModal').modal('hide');
            this.toastr.success( name + ' ly Updated');
            this.getCategoryList();
        }, error => {
            this.categoryName = '';
            $('#myModal').modal('hide');
            this.toastr.error('Something went to error');
        });
      } else {
        this.toastr.error('Numeric value not allowed in Industry name');
      }
    } else{
    this.toastr.error('100 character only allowed in the Industry name');
    }
  }

  public getFilter(value): void {
    console.log(value);
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.categoryFilter = value !== 'All' ? value : undefined;
    // this.categoryFilter = value;


    this.getCategoryList();
  }
  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
