import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'src/app/shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { RatingReviewService } from '../../service/rating-review.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-individual-rating',
  templateUrl: './individual-rating.component.html',
  styleUrls: ['./individual-rating.component.css']
})
export class IndividualRatingComponent implements OnInit, OnDestroy {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  individualRating: any;
  page: Page<any> = new Page();
  loginUserDetails: any;


  constructor(private route: ActivatedRoute, private router: Router,
              private customePagination: CustomePaginationService,
              private toaster: ToastrService, private ratingService: RatingReviewService) { }

  ngOnInit(): void {
    this.loginUserDetails = JSON.parse(localStorage.getItem('userInfo'));
    this.loading = true;
    // this observable subscribe for ratings for pariticular user.
    // this.ratingService.castrating.subscribe( (res: any) => {
    //   debugger;
    //   if (!res.data) {
    //     console.log("fetching")
    //     // tslint:disable-next-line:max-line-length
    //     this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
    //   }
    //   else {
    //     this.page = res.data;
    //     this.loading = false;
    //   }
    // })
    this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');

  }

  getIndividualRating(id, role): void {
    console.log('get individual rating called');
    this.ratingService.getViewIndividualRating(this.page.pageable, id, role)
    .subscribe(responce => {
      console.log('responce.data of individual rating', responce.data);
      console.log('get individual rating called and this is response');

      this.page = responce.data;
      this.loading = false;

    }, error => {
        this.loading = false;
    });
  }


  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
  }
  deleteUser(id) {
    console.log(id)
    const obj = {
      ratingId : id,
      userId: this.loginUserDetails.user.id
    }
    this.ratingService.deleteReview(obj)
    .then( (res) => {
      console.log(res);
      this.page.pageable.pageNumber = 0;
      this.toaster.success('Rating removed successfully.');
      this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
    })
    .catch ( (err) => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {

    console.log('ratings destroyed');

  }

}




























// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Page } from 'src/app/shared/pagination/page';
// import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
// import { RatingReviewService } from '../../service/rating-review.service';
// import { ngxLoadingAnimationTypes } from 'ngx-loading';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';


// @Component({
//   selector: 'app-individual-rating',
//   templateUrl: './individual-rating.component.html',
//   styleUrls: ['./individual-rating.component.css']
// })
// export class IndividualRatingComponent implements OnInit, OnDestroy {

//   public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
//   public loading = false;

//   individualRating: any;
//   page: Page<any> = new Page();
//   loginUserDetails: any;


//   constructor(private route: ActivatedRoute, private router: Router,
//               private customePagination: CustomePaginationService,
//               private toaster: ToastrService, private ratingService: RatingReviewService) { }

//   ngOnInit(): void {
//     this.loginUserDetails = JSON.parse(localStorage.getItem('userInfo'));
//     this.loading = true;
//     // console.log('this.route.snapshot.params id', this.route.snapshot.params.userId );
//     // console.log('this.route.snapshot.params role', this.route.snapshot.params['role'] );
//     // this.checkRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '' )


//     this.ratingService.castrating.subscribe( (res: any) => {
//       if (!res.data) {
//         console.log("fetching")
//         // tslint:disable-next-line:max-line-length
//         this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
//       }
//       else {
//         this.page = res.data;
//         this.loading = false;
//       }
//     })

//   }

//   getIndividualRating(id, role): void {
//     console.log('get individual rating called');
//     this.ratingService.getViewIndividualRating(this.page.pageable, id, role)
//     .subscribe(responce => {
//       console.log('responce.data of individual rating', responce.data);
//       console.log('get individual rating called and this is response');

//       this.page = responce.data;
//       this.loading = false;

//     }, error => {
//         this.loading = false;
//     });
//   }


//   public getNextPage(): void {
//     this.loading = true;
//     this.page.pageable = this.customePagination.getNextPage(this.page);
//     this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
//   }

//   public getPreviousPage(): void {
//     this.loading = true;
//     this.page.pageable = this.customePagination.getPreviousPage(this.page);
//     this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
//   }

//   public getPageInNewSize(pageSize: number): void {
//     this.loading = true;
//     this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
//     this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
//   }
//   deleteUser(id) {
//     console.log(id)
//     const obj = {
//       ratingId : id,
//       userId: this.loginUserDetails.user.id
//     }
//     this.ratingService.deleteReview(obj)
//     .then( (res) => {
//       console.log(res);
//       this.page.pageable.pageNumber = 0;
//       this.toaster.success('Rating removed successfully.');
//       this.getIndividualRating(this.route.snapshot.params.userId, this.route.snapshot.params.role ? this.route.snapshot.params.role : '');
//     })
//     .catch ( (err) => {
//       console.log(err);
//     });
//   }

//   ngOnDestroy(): void {

//     console.log('ratings destroyed');

//   }

// }
