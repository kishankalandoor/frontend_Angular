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
  selector: 'app-tag-value',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class TagValueComponent implements OnInit, OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  inputText:any;
  private toolsSubscription: Subscription;

  page: Page<any> = new Page();

  config = {
    name : 'Languages', flag: 1, tableColumn1: 'Tools', tableColumn2: 'Languages',  createorUpdateFlag: 0, object: {},
    textFilter: undefined, tagSubFilter: undefined,
  };
  subValue: any;
  selectedLevel: any;
  dropDownList: Array<any>;
  error = false;
  dropdownerror=false;
  filterUpdate = new Subject<string>();

  constructor(private masterService: MasterService, private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    this.getSubTag();
  }

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.getSubTag();
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
        this.masterService.getSubTagList(this.page.pageable, this.config.textFilter, this.config.tagSubFilter)

        .subscribe(responce => {
            this.page = responce.data;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        });
    });
  }

  getSubTag(): void{
    this.masterService.getSubTagList(this.page.pageable, this.config.textFilter, this.config.tagSubFilter)
    .subscribe(responce => {
      this.page = responce.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getSubTag();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getSubTag();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getSubTag();
  }

  public refreshPage(): void {
      window.location.reload();
  }

  public applyFilter(value): void {
    this.config.textFilter = value;
    this.getSubTag();
  }

  public create(): void {
    this.subValue = '';
    this.selectedLevel = '';
    this.config.createorUpdateFlag = 0;
    this.masterService.getTagList(this.page.pageable, 0, this.config.textFilter, this.config.tagSubFilter)
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


    if(name.length <= 100) {
        if(!name.match('[0-9]+')){
              const body = { tagValueName: name, isActive: true, userId: this.authenticationService.authValue.id };
              this.masterService.saveSubTag(body).pipe(first())
              .subscribe({
                  next: () => {
                      $('#dropdownModal').modal('hide');
                      this.toastr.success( name + ' Successfully Created.');
                      this.getSubTag();
                  }, error: error => {
                      $('#dropdownModal').modal('hide');
                      // this.toastr.error('Something went to error');
                  }
                }
              );
        }else{
          this.toastr.error('Numeric value not allowed in Language name');
        }
    }
    else{
        this.toastr.error('100 character only allowed in the Language name');
    }
  }


  public onChange(tag, value): void{
    // const body = { tagValueName: tag.tagValue, tagId: tag.tags.id, id: tag.id, isActive: value, userId: this.authenticationService.authValue.id  };
    const body = { tagValueName: tag.tagValue, id: tag.id, isActive: value, userId: this.authenticationService.authValue.id  };

    this.masterService.saveSubTag(body).pipe(first())
    .subscribe(() => {
      if(value){
        this.toastr.success(  tag.tagValue + ' is Active');
        this.getSubTag();
      }
      else{
        this.toastr.success(  tag.tagValue + ' is Inactive');
        this.getSubTag();
      }

    }, error => {
        this.toastr.error(error);
    });
  }

  public edit(tag): void {
    // this.masterService.getTagList(this.page.pageable, 0, this.config.textFilter)
    // .subscribe(responce => {
    //   this.dropDownList = responce.data.content;
    // });
    this.config.createorUpdateFlag = 1;
    this.config.object = tag;
    this.subValue = tag.tagValue;
    // this.selectedLevel = tag.tags.id;
    $('#dropdownModal').modal('show');
  }

  public updateValue(tag, name, subtagId): any {
      const body = { tagValueName: name, id: tag.id, isActive: tag.active, userId: this.authenticationService.authValue.id  };
      if(name.length <= 100){
        if(!name.match('[0-9]+')){
          this.masterService.saveSubTag(body).pipe(first())
          .subscribe(() => {
              this.subValue = '';
              // this.selectedLevel = '';
              $('#dropdownModal').modal('hide');
              this.toastr.success( name + ' Successfully Updated.');
              this.getSubTag();
          }, error => {
              this.subValue = '';
              // this.selectedLevel = '';
              $('#dropdownModal').modal('hide');
              this.toastr.error('Something went to error');
          });
        } else {
          this.toastr.error('Numeric value not allowed in Language name');
        }
      } else {
        this.toastr.error('100 character only allowed in the Language name');
      }
  }



  public getFilter(value): void {
    console.log(value);
    this.loading = true;
    this.page.pageable.pageNumber = 0;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.tagSubFilter = value !== 'All' ? value : undefined;
    this.getSubTag();
  }

  ngOnDestroy(): void {
    this.filterUpdate.unsubscribe();
  }

}
