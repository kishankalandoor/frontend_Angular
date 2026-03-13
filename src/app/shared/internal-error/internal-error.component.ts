import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.css']
})
export class InternalErrorComponent implements OnInit {

  constructor(private route:ActivatedRoute) { 
    this.error = this.route.snapshot.paramMap.get('err');
    console.log(this.error);
  }
  error:any;

  ngOnInit(): void {
    console.log(this.error)
  }

}
