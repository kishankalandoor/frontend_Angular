import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { RatingReviewService } from '../../../../rate-review/service/rating-review.service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['../user-details.component.css']
})
export class AgencyComponent implements OnInit{



  @Input() userDetail: any;
  @Input() currentRate: any;

  public show: boolean = false;
  public btnHidden: any = 'View Bank Details';
  public fId = '';
  public isTrue: boolean;
  public isagencyHourlyRateCard = false;
  public isagencyDocuments = false;
  public isAwards = false;
  public isAgencyVerified: boolean;
  agencyRateCard: string;
  agencyHourlyCard: string;
  qm: number;
  hour: string;
  agencyDocs: [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toaster: ToastrService, private ratingService: RatingReviewService) { }

  ngOnInit(): void {
    // console.log(this.userDetail.agencyHourlyRateCard );
    this.agencyHourlyRateCard();
    this.agencyDocument();
    this.awardsCertificates();
    this.getUserDetails(this.route.snapshot.params['userId'], this.route.snapshot.params['role']?this.route.snapshot.params['role']:'');
    this.agencyRateCard = this.userDetail.agencyHourlyRateCard.replace(/^.*[\\\/]/, '');
    console.log(this.agencyRateCard);
    this.agencyHourlyCard = this.agencyRateCard.substring(0, this.agencyRateCard.indexOf('?'));
    console.log(this.hour);

    this.userDetail.agencyDocuments.map(elem => {
      elem.documentPath =  elem.documentPath.replace(/^.*[\\\/]/, '');
      // const element = elem;
      // this.agencyDocs.push(elem);
      console.log('agencyDo', this.agencyDocs);
    });


    }

    getUserDetails(userId, role): void {
      this.userService.getUserDetail(userId, role)
      .subscribe(responce => {
        console.log('isAgencyVerified',responce.data.isAgencyVerified);
        this.isAgencyVerified = responce.data.isAgencyVerified;
        console.log(this.userDetail);
      }, error => {

      });
    }

    agencyHourlyRateCard(): any{
      if (this.userDetail.agencyHourlyRateCard){
        console.log('hourly card is present');
        this.isagencyHourlyRateCard = true;
      }
      else{
        this.isagencyHourlyRateCard = false;
      }
    }

    agencyDocument(): any{
      if (this.userDetail.agencyDocuments){
        console.log('Agency docs is present');
        this.isagencyDocuments = true;
      }
      // else{
      //   this.isagencyDocuments = false;
      // }
    }

    awardsCertificates(): any{
      if (this.userDetail.awardDocuments){
        console.log('Agency docs is present');
        this.isAwards = true;
      }
      // else{
      //   this.isagencyDocuments = false;
      // }
    }


  onChange(freelanceId, val ): any{
    console.log(val);
    console.log(freelanceId);

    if (val){
        this.fId = freelanceId;
        this.isTrue = true;
        this.agencyVerification();

        this.toaster.success('Company Verified Sucessfully');
      }
      else{
        this.fId = freelanceId;
        this.isTrue = false;
        this.agencyVerification();

        this.toaster.success('Company Unverified Sucessfully');

      }
  }

  agencyVerification(): any{
    const obj = {

      freelancerId: this.fId,
      isAgencyVerified: this.isTrue

    };

    this.userService.agencyVerification(obj)
    .subscribe(responce => {
      console.log(responce);
      this.getUserDetails(this.route.snapshot.params['userId'], this.route.snapshot.params['role']?this.route.snapshot.params['role']:'');


    }, error => {

    });
  }

  toggle(): any {
    this.show = !this.show;
    this.show === true ?  this.btnHidden = 'Hide Bank Details' : this.btnHidden = 'View Bank Details';
  }

  // checkRating(id, role) {
  //   console.log('check rating called', role);
  //   this.ratingService.checkViewIndividualRating(id, role)
  //   .subscribe( (res: any) => {
  //     console.log(res.data);
  //     if(!res.data.empty) {
  //       this.router.navigate(['/main/rating/individual-rating-detail', id, role]);
  //       this.ratingService.userRating(res);
  //     }
  //     else {

  //     }
  //   });
  // }

}
