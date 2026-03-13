import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-ticket-view-detail',
  templateUrl: './ticket-view-detail.component.html',
  styleUrls: ['./ticket-view-detail.component.css']
})
export class TicketViewDetailComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false; 

  ticketDetail: any;
  ticketDocumentList: [];
  ticketResponse: [];

  constructor(private ticketService: TicketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    // tslint:disable-next-line: no-string-literal
    this.getTicketDetail(this.route.snapshot.params['ticketId']);
  }

  getTicketDetail(ticketId): any {
    this.ticketService.getViewTicketDetail(ticketId)
      .subscribe(responce => {
          console.log(responce.data)
          this.ticketDetail = responce.data;
          console.log(this.ticketDetail.ticketProfilePic)
          this.ticketDocumentList = responce.data.ticketDocuments;
          this.ticketResponse = responce.data.ticketResponse;
          this.loading = false;
      }, (error) => {
          this.loading = false;
        }
      );
  }
}
