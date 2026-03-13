import { Component, Input, OnChanges } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent implements  OnChanges {

  @Input() invoiceObject: any;
  @Input() userFlag: any;
  @Input() toDownload: any;

  invoiceDate: String;
  total: number = 0;
  userInfo: String;
  userName: String;

  constructor() { }

  ngOnChanges(): void {
    console.log("this.invoiceObject", this.invoiceObject);
    console.log(this.userFlag)
    if(this.toDownload) {
      this.getDownloadPdf();
    }
  }


  getDownloadPdf(){

    this.invoiceDate = this.invoiceObject.invoice.statusMaster.statusName === "Raised" || "Reject" ? this.invoiceObject.invoice.invoiceRaisedDate : this.invoiceObject.invoice.invoiceApprovedDate;
    console.log(this.userFlag)
    if(this. userFlag == 0){
      this.userName = "Client";
      this.total = this.invoiceObject.clientCharges + this.invoiceObject.invoice.invoiceAmount;
      this.userInfo = this.invoiceObject.invoice.projectBidMap.projectEntity.clientDetails.user.firstName;
    }
    else {
      this.userName = this.invoiceObject.invoice.projectBidMap.freelancerDetails.agency ? "Company" : "Freelancer";
      this.total = this.invoiceObject.invoice.invoiceAmount - this.invoiceObject.freelancerCharges;
      this.userInfo = this.invoiceObject.invoice.projectBidMap.freelancerDetails.agency ? this.invoiceObject.invoice.projectBidMap.freelancerDetails.agencyName : this.invoiceObject.invoice.projectBidMap.freelancerDetails.title;
    }
    // else{
    //   this.userName = "Company";
    //   this.total = this.invoiceObject.invoice.invoiceAmount - this.invoiceObject.freelancerCharges;
    //   this.userInfo = this.invoiceObject.invoice.projectBidMap.freelancerDetails.agencyName;
    // }

    const content: Element = document.getElementById('htmlData');
    const options = {
      margin: 0,
      filename: '' + this.invoiceObject.invoice.invoiceId + '-' + this.userName + '.pdf',
      image:{ type:'jpeg', quality: 0.98 },
      html2canvas:{ scale: 3, y: 0,  scrollY: 0, dpi: 192, letterRendering: true },
      jsPDF:{ orientation:'landscape', format: 'A4'}
    };
    html2pdf().from(content).set(options).save();
  }

}
