import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent, Subject, Subscription} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit, OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  private industySubscription: Subscription;

  page: Page<any> = new Page();

  config = {
    name : 'Skills', flag: 0, tableColumn1: 'Industry', tableColumn2: 'Skills', createorUpdateFlag: 0, object: {},
    textFilter: undefined, categoryFilter: undefined, subCategoryFilter: undefined,
  };
  error = false;
  dropdownerror=false;
  subValue: any;
  inputText:any;
  selectedLevel: any;
  dropDownList: Array<any>;
  filterUpdate = new Subject<string>();

  constructor(private masterService: MasterService, private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    this.getSubCategory();
  }

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.getSubCategory();
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
      this.masterService.getSubCategoryList(this.page.pageable, this.config.textFilter, this.config.subCategoryFilter)
      .subscribe(responce => {
          this.page = responce.data;
          this.loading = false;
      }, (error) => {
          this.loading = false;
      });
    });
  }
  getSubCategory(): void{
    this.masterService.getSubCategoryList(this.page.pageable, this.config.textFilter, this.config.subCategoryFilter)
    .subscribe(responce => {
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
    this.getSubCategory();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getSubCategory();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getSubCategory();
  }

  public refreshPage(): void {
      window.location.reload();
  }

  public applyFilter(value): void {
    this.config.textFilter = value;
    this.getSubCategory();
  }

  public create(): void {
    this.subValue = '';
    this.selectedLevel = '';
    this.config.createorUpdateFlag = 0;
    this.masterService.getCategoryList(this.page.pageable, 0, this.config.textFilter, this.config.categoryFilter)
    .subscribe(responce => {
      this.dropDownList = responce.data.content;
    });
    $('#dropdownModal').modal('show');
  }

  public saveValue(name): void{
    if (name === ''){
      this.error = true;
      setTimeout(function() { this.error = false; }.bind(this), 3000);
      return;
    }
    // if (id == 0){
    //   this.dropdownerror = true;
    //   setTimeout(function() { this.dropdownerror = false; }.bind(this), 3000);
    //   return;
    // }

    if(name.length <= 100){
      if(!name.match('[0-9]+')){
        const body = { categoryName: name, isActive: true, userId: this.authenticationService.authValue.id };
        this.masterService.saveSubCategory(body).pipe(first())
        .subscribe({
            next: () => {
                $('#dropdownModal').modal('hide');
                this.toastr.success( name + ' Successfully Created.');
                this.getSubCategory();
            }, error: error => {
                $('#dropdownModal').modal('hide');
                // this.toastr.error('Something went to error');
            }
          });
      } else {
        this.toastr.error('Numeric value not allowed in Skills');
      }
    } else {
      this.toastr.error('100 charactor Only allowed in Skills');
    }
  }

  public onChange(category, value): void {
    // const body = { categoryName: category.categoryName, id: category.id, categoryId: category.category.id, isActive: value, userId: this.authenticationService.authValue.id };
    const body = { categoryName: category.categoryName, id: category.id, isActive: value, userId: this.authenticationService.authValue.id };

    this.masterService.saveSubCategory(body).pipe(first())
    .subscribe(() => {
      if(value){
        this.toastr.success( category.categoryName + ' is Active');
        this.getSubCategory();
      }
      else{
        this.toastr.success( category.categoryName + ' is Inactive');
        this.getSubCategory();
      }

    }, error => {
        this.toastr.error(error);
    });
  }

  public edit(category): void {
    // this.masterService.getCategoryList(this.page.pageable, 0, this.config.textFilter)
    // .subscribe(responce => {
    //   this.dropDownList = responce.data.content;
    // });
    this.config.createorUpdateFlag = 1;
    this.config.object = category;
    this.subValue = category.categoryName;
    // this.selectedLevel = category.category.id;
    $('#dropdownModal').modal('show');
  }

  public updateValue(category, name, id): any {
    const body = {  categoryName: name, id: category.id, isActive: category.active, userId: this.authenticationService.authValue.id };
    if(name.length <= 100){
      if(!name.match('[0-9]+')){
      this.masterService.saveSubCategory(body).pipe(first())
      .subscribe(() => {
          this.subValue = '';
          $('#dropdownModal').modal('hide');
          this.toastr.success( name + ' Successfully Updated.');
          this.getSubCategory();
      }, error => {
          this.subValue = '';
          // this.selectedLevel = '';
          $('#dropdownModal').modal('hide');
          this.toastr.error('Something went to error');
      });
      }else{
        this.toastr.error('Numeric value not allowed in Skills');
      }
    }
    else{
      this.toastr.error('100 charactor Only allowed in Skills');
    }

  }
  public getFilter(value): void {
    console.log(value);
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.subCategoryFilter = value !== 'All' ? value : undefined;
    // this.categoryFilter = value;
    this.getSubCategory();
  }

  ngOnDestroy(): void {
    this.filterUpdate.unsubscribe();
  }


}
