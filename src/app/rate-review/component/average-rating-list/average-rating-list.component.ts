import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { RatingReviewService } from '../../service/rating-review.service';
import { Page } from 'src/app/shared/pagination/page';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'app-average-rating-list',
  templateUrl: './average-rating-list.component.html',
  styleUrls: ['./average-rating-list.component.css']
})
export class AverageRatingListComponent implements OnInit, OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  inputText: any;
  filterUpdate = new Subject<string>();
  isFreelancer = false;
  isAgency = false;


  page: Page<any> = new Page();
  textFilter: any;
  config = { UserRole: false, userFilter: undefined };
  isRatings: boolean;
    // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute,private ratingService: RatingReviewService, private customePagination: CustomePaginationService, private toastr: ToastrService) {
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
   }

  ngOnInit(): void {
    this.loading = true;
    this.getRatingList();
    this.filterUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.loading = true;
        console.log(value)
        this.textFilter = value;
        this.page.pageable.pageNumber = 0;
        this.ratingService.getRatingList(this.page.pageable, this.textFilter, this.config.userFilter)
        .subscribe(responce => {
          this.isRatings = responce.data.content.length > 0 ? true : false;
          console.log(responce);
          this.page = responce.data;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    });
  }

  onNoRole(){
    this.toastr.error('No Rating & Review Found');
  }

  getRatingList(): void {
  this.ratingService.getRatingList(this.page.pageable, this.textFilter, this.config.userFilter)
    .subscribe(responce => {
      this.isRatings = responce.data.content.length > 0 ? true : false;
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
    this.getRatingList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getRatingList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getRatingList();
  }

  public getAgency(value): any{
    this.isAgency = !this.isAgency;
    console.log('this.isAgency', this.isAgency)

    if (this.isAgency === true){
    this.loading = true;
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.userFilter = value !== 'All' ? value : '';
    console.log('A',this.config.userFilter);
    this.config.UserRole = value !== 'All' ? true : false;
    console.log('B', this.config.UserRole);
    this.getRatingList();
    }
    else{
      this.loading = true;
      const val = 'FREELANCER';
      this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
      this.config.userFilter = val;
      console.log('A', this.config.userFilter);
      this.config.UserRole = true;
      console.log('B', this.config.UserRole);
      this.getRatingList();
    }
  }


  public getChangeUser(value): void {
    if (value === 'Freelancer'){
      this.isFreelancer = true;
    }
    else{
      this.isFreelancer = false;
    }
    this.loading = true;
    console.log(value);
    this.page.pageable = this.customePagination.getPageDefaultSize(this.page);
    this.config.userFilter = value !== 'All' ? value : undefined;
    this.config.UserRole = value !== 'All' ? true : false;
    this.getRatingList();
  }

  public applyFilter(value): void {
    this.textFilter = value;
    this.getRatingList();
  }

  public refreshPage(): void {
    window.location.reload();
  }

  checkRating(id, role) {
    console.log('check rating called', role);
    this.ratingService.checkViewIndividualRating(id, role)
    .subscribe( (res: any) => {
      console.log(res.data);
      if(res.data.content.length > 0) {
        this.router.navigate(['/main/rating/individual-rating-detail', id, role]);
        this.ratingService.userRating(res);
      }
      else {
        this.onNoRole();
      }
    });
  }

//  checkRating(id) {
//     console.log('check rating called');
//     this.ratingService.checkViewIndividualRating(id)
//     .subscribe( (res:any) => {
//       console.log(res.data)
//       if(res.data.content.length > 0) {
//         this.router.navigate(['/main/rating/individual-rating-detail', id]);
//         this.ratingService.userRating(res);
//       }
//       else {
//         this.onNoRole()
//        }
//     })
//   }
  ngOnDestroy() {
    this.filterUpdate.unsubscribe();
  }
}
