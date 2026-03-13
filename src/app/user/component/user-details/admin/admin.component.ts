import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../user-details.component.css']
})
export class AdminComponent{

  @Input() userDetail: any;
  @Input() currentRate: any;

}
