import { Component, OnInit } from '@angular/core';
import { Page } from '../../../shared/pagination/page';
import { CustomePaginationService } from '../../../shared/pagination/service/custome-pagination.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/login-auth/service/authentication.service';
import { AeromaritimeService } from '../../service/aeromaritime.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
declare var $: any;

@Component({
  selector: 'app-freelancer-charge',
  templateUrl: './aeromaritime-charge.component.html',
  styleUrls: ['./aeromaritime-charge.component.css']
})
export class FreelancerChargeComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  config = { name : 'Service Provider', flag: 0, createorUpdateFlag: 0, object: {} };
  error = false;
  percentage: any;
  activeCharges:any;

  constructor( private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService, private aeromaritimeService: AeromaritimeService) {

    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
    // this.getFreelancerChargesList();
   }

  ngOnInit(): void {
    this.loading = true;
    this.getActiveCharges()
  }
  getActiveCharges() {
    this.aeromaritimeService.getFreelancerCharges()
    .then( (res:any) => {
      console.log(res)
      this.activeCharges = res.data;
    })
    .catch( (err) => {
      console.log(err)
    })
  }
  getFreelancerChargesList(): void {
      this.aeromaritimeService.getFreelancerChargesList(this.page.pageable)
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
    this.getFreelancerChargesList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getFreelancerChargesList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getFreelancerChargesList();
  }

  public refreshPage(): void {
      window.location.reload();
  }

  public create(): void {
      // this.percentage = 0;
      this.config.createorUpdateFlag = 0;
      $('#myModal').modal('show');
  }

  public saveValue(percentageValue): void {
    if (percentageValue === ''){
      this.error = true;
      setTimeout(function() { this.error = false; }.bind(this), 3000);
      return;
    }
    const body = { percentage: percentageValue, isActive: true, userId: this.authenticationService.authValue.id };
    if(percentageValue >= 1 && percentageValue <= 100){
    this.aeromaritimeService.saveFreelancerCharges(body).pipe(first())
    .subscribe({
        next: () => {
            this.percentage = '';
            $('#myModal').modal('hide');
            this.toastr.success(percentageValue + '% Successfully Updated.');
            this.getFreelancerChargesList();
            this.getActiveCharges();
        }, error: error => {
            this.percentage = '';
            $('#myModal').modal('hide');
            this.toastr.error('Something went to error');
        }
      }
    );
    } else {
      this.toastr.error('Percentage 1 to 100 only allowed');
    }
  }

  public onChange(FreelancerCharge, value): void {
    const body = { id: FreelancerCharge.id, percentage: FreelancerCharge.percentage, isActive: value, userId: this.authenticationService.authValue.id };
    this.aeromaritimeService.saveFreelancerCharges(body).pipe(first())
    .subscribe({
        next: () => {
            this.toastr.success(FreelancerCharge.percentage + ' Successfully Updated.');
            this.getFreelancerChargesList();
        }, error: error => {
            this.toastr.error('Something went to error');
        }
      }
    );
  }

  public edit(FreelancerCharge): void {
    this.config.createorUpdateFlag = 1;
    this.config.object = FreelancerCharge;
    this.percentage = FreelancerCharge.percentage;
    $('#myModal').modal('show');
  }

  public updateValue(FreelancerCharge, percentageValue): void {
    const body = { id: FreelancerCharge.id, percentage: percentageValue, isActive: FreelancerCharge.active, userId: this.authenticationService.authValue.id };
    if(percentageValue >= 0 && percentageValue <= 100){
    this.aeromaritimeService.saveFreelancerCharges(body).pipe(first())
    .subscribe({
        next: () => {
            $('#myModal').modal('hide');
            this.toastr.success(this.percentage + ' Successful Updated.');
            this.getFreelancerChargesList();
        }, error: error => {
            $('#myModal').modal('hide');
            this.toastr.error('Something went to error');
        }
      }
    );
    } else {
      this.toastr.error('Percentage 1 to 100 only allowed');
    }
  }

}
