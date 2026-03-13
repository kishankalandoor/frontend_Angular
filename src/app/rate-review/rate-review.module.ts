import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageRatingListComponent } from './component/average-rating-list/average-rating-list.component';
import { IndividualRatingComponent } from './component/individual-rating/individual-rating.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
      path:'',
      redirectTo : 'avg-rating-list',
      pathMatch: 'full'
    },
    {
      path: 'avg-rating-list', component: AverageRatingListComponent
    },
    {
      path: 'individual-rating-detail/:id', component: IndividualRatingComponent
    },
    {
      path: 'individual-rating-detail/:userId/:role', component: IndividualRatingComponent
    }
];


@NgModule({
  declarations: [AverageRatingListComponent, IndividualRatingComponent],
  imports: [
    CommonModule, SharedModule, TooltipModule, NgbModule, NgxLoadingModule, FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RateReviewModule { }
