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
  selector: 'app-client-charge',
  templateUrl: './aeromaritime-charge.component.html',
  styleUrls: ['./aeromaritime-charge.component.css']
})
export class ClientChargeComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  page: Page<any> = new Page();
  config = { name : 'Client', flag: 0, createorUpdateFlag: 0, object: {} };
  error = false;
  amount: any;
  activeCharges:any;

  constructor( private customePagination: CustomePaginationService, private toastr: ToastrService, private authenticationService: AuthenticationService, private aeromaritimeService: AeromaritimeService) {
    // this.getClientChargesList();
    if (document.getElementById('sidebar').classList.contains('active')){
      document.getElementById('sidebar').classList.toggle('active');
    }
   }

  ngOnInit(): void {
    this.loading = true;
    this.getActiveCharges();
  }
  getActiveCharges() {
    this.aeromaritimeService.getClientCharges()
    .then( (res:any) => {
      console.log(res)
      this.activeCharges = res.data;
    })
    .catch( (err) => {
      console.log(err)
    })
  }
  getClientChargesList(): void {
    this.aeromaritimeService.getClientChargesList(this.page.pageable)
    .subscribe(responce => {
      console.log(responce.data)
      this.page = responce.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  public getNextPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getNextPage(this.page);
    this.getClientChargesList();
  }

  public getPreviousPage(): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPreviousPage(this.page);
    this.getClientChargesList();
  }

  public getPageInNewSize(pageSize: number): void {
    this.loading = true;
    this.page.pageable = this.customePagination.getPageInNewSize(this.page, pageSize);
    this.getClientChargesList();
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
    const body = { percentage: percentageValue, isActive: true, userId: this.authenticationService.authValue.id };
    console.log(percentageValue)
    if(percentageValue >= 0 && percentageValue <= 999999999 && percentageValue){
    this.aeromaritimeService.saveClientCharges(body).pipe(first())
    .subscribe({
        next: () => {
            this.amount = '';
            $('#myModal').modal('hide');
            this.toastr.success(percentageValue + ' Amount Updated successfully.');
            this.getActiveCharges()
            this.getClientChargesList();
        }, error: error => {
            console.log(error)
            this.amount = '';
            $('#myModal').modal('hide');
            this.toastr.error('Something went to wrong');
        }
      }
    );
  } else {
    this.toastr.error('Please Enter Valid Amount.');
  }
  }

  // public onChange(clientCharge, value): void {
  //   const body = { id: clientCharge.id, percentage: clientCharge.percentage, isActive: value, userId: this.authenticationService.authValue.id };
  //   this.aeromaritimeService.saveClientCharges(body).pipe(first())
  //   .subscribe({
  //       next: () => {
  //           $('#myModal').modal('hide');
  //           this.toastr.success(clientCharge.percentage + ' Successful Updated');
  //           this.getClientChargesList();
  //       }, error: error => {
  //           $('#myModal').modal('hide');
  //           this.toastr.error('Something went to error');
  //       }
  //     });
  // }

//   let number = document.getElementById('number');

// // Listen for input event on numInput.
// number.onkeydown = e => {
//     if(!((e.keyCode > 95 && e.keyCode < 106)
//       || (e.keyCode > 47 && e.keyCode < 58)
//       || e.keyCode == 8)) {
//         return false;
//     }
// }

  // public edit(clientCharge): void {
  //   this.config.createorUpdateFlag = 1;
  //   this.config.object = clientCharge;
  //   this.amount = clientCharge.percentage;
  //   $('#myModal').modal('show');
  // }

  // public updateValue(clientCharge, percentageValue): void {
  //   const body = { id: clientCharge.id, percentage: percentageValue, isActive: clientCharge.active, userId: this.authenticationService.authValue.id };
  //   if(percentageValue >= 1 && percentageValue <= 100){
  //     this.aeromaritimeService.saveClientCharges(body).pipe(first())
  //     .subscribe({
  //         next: () => {
  //             $('#myModal').modal('hide');
  //             this.toastr.success(percentageValue  + ' Successful Updated');
  //             this.getClientChargesList();
  //         }, error: error => {
  //             $('#myModal').modal('hide');
  //             this.toastr.error('Something went to error');
  //         }
  //       });
  //   } else {
  //     this.toastr.error('Percentage 1 to 100 only allowed');
  //   }
  // }



}
