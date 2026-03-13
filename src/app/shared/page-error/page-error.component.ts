import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
    console.log(window.history)
  }
  goback() {
    if(sessionStorage.getItem('responseError')) {
      history.go(-2)
      sessionStorage.removeItem('responseError')
      return
    }
    this.location.back()
  }
}
