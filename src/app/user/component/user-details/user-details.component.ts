import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  userDetail: any;
  userDocumentList: [];
  currentRate = 0;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private location:Location) { }

  ngOnInit(): void {
    this.loading = true;
    // tslint:disable-next-line: no-string-literal
    this.getUserDetails(this.route.snapshot.params['userId'], this.route.snapshot.params['role']?this.route.snapshot.params['role']:'');
  }

  getUserDetails(userId, role): void {
    this.userService.getUserDetail(userId, role)
    .subscribe(responce => {
      console.log(responce);
      console.log(responce);
      this.userDetail = responce.data;
      console.log(this.userDetail);
      if (this.userDetail.averageRating !== undefined && this.userDetail.averageRating !== null){
          this.currentRate =  this.userDetail.averageRating;
        }
      this.loading = false;
    }, error => {
        this.loading = false;
    });
  }

  back() {
    this.location.back();
  }

}





