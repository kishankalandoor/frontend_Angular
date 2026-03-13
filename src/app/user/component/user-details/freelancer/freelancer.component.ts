import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['../user-details.component.css']
})
export class FreelancerComponent{

  @Input() userDetail: any;
  @Input() currentRate: any;

  public show: boolean = false;
  public btnHidden: any = 'View Bank Details';

  toggle() {
    this.show = !this.show;
    this.show === true ?  this.btnHidden = 'Hide Bank Details' : this.btnHidden = 'View Bank Details';
  }

}
