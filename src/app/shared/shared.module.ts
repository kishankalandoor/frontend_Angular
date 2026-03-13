import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { RouterModule } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { NgxLoadingModule } from 'ngx-loading';
import { BrowserCompatablityDirective } from './browser-compatablity.directive';

@NgModule({
  declarations: [PaginationComponent, InternalErrorComponent, PageErrorComponent, PdfComponent, BrowserCompatablityDirective],
  imports: [
    CommonModule, FormsModule, TooltipModule, RouterModule,NgxLoadingModule
  ],
  exports: [PaginationComponent,PdfComponent,BrowserCompatablityDirective]
})
export class SharedModule { }
