import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { element } from 'protractor';
import {filter} from 'rxjs/operators';
import { AuthenticationService } from '../../../login-auth/service/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  loginUserDetails: any;

  constructor(private router: Router, private authenticationService: AuthenticationService) {

    this.loginUserDetails=JSON.parse(localStorage.getItem('userInfo'));

    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event:any) => {
          this.menus.forEach( (element) => {
            if(element.routerLink == event.urlAfterRedirects && !element.flag || event.urlAfterRedirects.includes(element.checkingLink)) {
              element.active = true;
            }
            else {
              element.active = false;
              element.ariaExpanded = false;
            }
            if (element.submenu) {
              element.submenu.forEach( (subElement) => {
                if(subElement.routerLink == event.urlAfterRedirects) {
                  element.active = false;
                  element.ariaExpanded = true;
                  subElement.active = true;
                  subElement.flag = 1;
                  console.log(subElement)
                }
                else {
                  subElement.active = false;
                  subElement.flag = 0;
                }
              })
            }
          })
      });
  }
  ngOnInit() {
  }
  menus = [
    {id: 1, routerLink: '/main/dashboard/landing-dashboard', iconName: 'fa-th-large fas', menuName: 'Dashboard', flag: 0, active:false,checkingLink:'/dashboard/'},
    {id: 2, routerLink: '/main/user/user-list', iconName: 'fa-user fas', menuName: 'User', flag: 0, active:false,checkingLink:'/user/'},
    {id: 3, routerLink: '/main/project/project-list', iconName: 'fa-tasks fas', menuName: 'Project', flag: 0, active:false,checkingLink:'/project/'},
    {id: 4, routerLink: '/main/rating/avg-rating-list', iconName: 'fa-star fas', menuName: 'Rating & Review', flag: 0, active:false,checkingLink:'/rating/'},
    // {id: 5, routerLink: '/main/ticket/ticket-list', iconName: 'fa-sticky-note fas', menuName: 'Ticket', flag: 0, active:false,checkingLink:'/ticket/'},
    {id: 6, routerLink: '/main/invoice/invoice-list', iconName: 'fa-money-bill-alt fas', menuName: 'Invoice', flag: 0, active:false,checkingLink:'/invoice/'},
    {id: 7, routerLink: '/main/inquirie/inquirie-list', iconName: 'fa-list-alt fas', menuName: 'Inquiries', flag: 0, active:false,checkingLink:'/inquirie/'},
    {id: 8, routerLink: '/main/client-invites/client-invites-list', iconName: 'fa fa-user-plus', menuName: 'Client Invites', flag: 0, active:false,checkingLink:'/client-invites/'},
    {id: 9, routerLink: '', iconName: 'fa-cube fas', menuName: 'Master', flag: 1, ariaExpanded:false,
      submenu : [
        {id: 1, routerLink: '/main/master/master-industry', iconName: 'fa fa-industry', menuName: 'Industry', flag: 0, active:false},
        {id: 2, routerLink: '/main/master/master-skills', iconName: 'fa fa-umbrella', menuName: 'Skills', flag: 0, active:false},
        {id: 3, routerLink: '/main/master/master-tools', iconName: 'fa fa-tools', menuName: 'Tools', flag: 0, active:false},
        {id: 4, routerLink: '/main/master/master-languages', iconName: 'fa fa-language', menuName: 'Languages', flag: 0, active:false}
      ]
    },
    {id: 10, routerLink: '', iconName: 'fas fa-user-tag', menuName: 'Charges', flag: 1,ariaExpanded:false,
      submenu : [
        {id: 1, routerLink: '/main/aeromaritimeCharges/client-charges', iconName: 'fas fa-user-tie', menuName: 'Client', flag: 0, active:false},
        {id: 2, routerLink: '/main/aeromaritimeCharges/freelancer-charges', iconName: 'fas fa-user-shield', menuName: 'Service Provider', flag: 0, active:false},
      ]
    },

  ];

  toggleChange(): void {
    document.getElementById('sidebar').classList.toggle('active');
  }

  logout(): any{
    this.authenticationService.logout();
  }

}
