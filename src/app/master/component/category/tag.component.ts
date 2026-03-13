import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent, Observable, Subject, Subscription,} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-tag',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class TagComponent implements OnInit,OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  inputText:string;
  filterUpdate = new Subject<string>();
  isTagList: boolean;
  

  config = {
    name : 'Tools', flag: 1, createorUpdateFlag: 0, object: {}, textFilter:undefined, tagFilter: undefined,
  };
  categoryName: any;
  error = false;
  eleSub$:Observable<any>;
  subscription:Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(private masterService: MasterService, private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    this.getTagList();
  }

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.getTagList();
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
        this.masterService.getTagList(this.page.pageable, 1, this.config.textFilter, this.config.tagFilter)

        .subscribe(responce => {
            this.isTagList = responce.data.content.length > 0 ? true : false;
            this.page = responce.data;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        });
    });
  }



  getTagList(): any {
    this.masterService.getTagList(this.page.pageable, 1, this.config.textFilter, this.config.tagFilter)
     .subscribe(responce => {
      this.isTagList = responce.data.content.length > 0 ? true : false;
       this.page = responce.data;
       this.loading = false;
     }, error => {
       this.loading = false;
     });
   }

   public getNextPage(): void {
    this.loading = true;
     this.page.pageable = this.customePagination.getNextPage(this.page);
     this.getTagList();
   }

   public getPreviousPage(): void {
    this.loading = true;
     this.page.pageable = this.customePagination.getPreviousPage(this.page);
     this.getTagList();
   }

   public getPageInNewSize(pageSize: number): void {
    this.loading = true;
     this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
     this.getTagList();
   }

   public applyFilter(value): void {
    this.config.textFilter = value;
    this.getTagList();
  }

   public refreshPage(): void {
       window.location.reload();
   }

   public create(): void {
      this.categoryName = '';
      this.config.createorUpdateFlag = 0;
      $('#myModal').modal('show');
   }

   public saveValue(tagName): void{
     if (tagName === ''){
        this.error = true;
        setTimeout(function() { this.error = false; }.bind(this), 3000);
        return;
     }
     const body = { name: tagName, isActive: true, userId: 1 };
     if(tagName.length <= 100){
      if(!tagName.match('[0-9]+')){
      this.masterService.saveTag(body).pipe(first())
      .subscribe({
          next: () => {
                this.categoryName = '';
                $('#myModal').modal('hide');
                this.toastr.success( name + ' Successfully Created.');
                this.getTagList();
          }, error: error => {
                this.categoryName = '';
                $('#myModal').modal('hide');
                // this.toastr.error('Something went to error');
          }
        });
      }
      else{
        this.toastr.error('Numeric value not allowed in Tools name');
      }
    }
    else{
      this.toastr.error('100 character only allowed in the Tools name');
    }
  }

  public onChange(tag, value): void{
    const body = { id: tag.id, name: tag.name, isActive: value, userId: this.authenticationService.authValue.id };
    this.masterService.saveTag(body).pipe(first())
    .subscribe(() => {
      if(value) {
        this.toastr.success( tag.name + ' is Active');
        this.getTagList();
      }
      else{
        this.toastr.success( tag.name + ' is Inactive');
        this.getTagList();
      }

    }, error => {
        this.toastr.error(error);
    });
  }

  public edit(tag): void {
    this.config.createorUpdateFlag = 1;
    this.config.object = tag;
    this.categoryName = tag.name;
    $('#myModal').modal('show');
  }

  public updateValue(tag, tagName): any {
    const body = { id: tag.id, name: tagName, isActive: tag.active, userId: this.authenticationService.authValue.id };
    if(tagName.length <= 100){
      if(!tagName.match('[0-9]+')){
      this.masterService.saveTag(body).pipe(first())
      .subscribe(() => {
          this.categoryName = '';
          $('#myModal').modal('hide');
          this.toastr.success( tagName + ' Successfully Updated.');
          this.getTagList();
      }, error => {
          this.categoryName = '';
          $('#myModal').modal('hide');
          // this.toastr.error('Something went to error');
      });
      }
      else{
        this.toastr.error('Numeric value not allowed in Tools name');
      }
    }
    else{
      this.toastr.error('100 character only allowed in the Tools name');
    }
  }

  public getFilter(value): void {
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.tagFilter = value !== 'All' ? value : undefined;
    this.getTagList();
  }
  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
