import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../user-details.component.css']
})
export class CustomerComponent{

  @Input() userDetail: any;
  @Input() currentRate: any;


}
