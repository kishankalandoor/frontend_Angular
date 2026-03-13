import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-role',
  templateUrl: './no-role.component.html',
  styleUrls: ['./no-role.component.css']
})
export class NoRoleComponent  {

  @Input() userDetail: any;
  @Input() currentRate: any;
}
