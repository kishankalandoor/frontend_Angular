import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryComponent } from './component/sub-category/sub-category.component';
import { SharedModule } from '../shared/shared.module';
import { TagComponent } from './component/category/tag.component';
import { TagValueComponent } from './component/sub-category/tag-value.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
    {
      path:'',
      redirectTo : 'master-industry',
      pathMatch: 'full'
    },
    {
      path: 'master-industry', component: CategoryComponent
    },
    {
      path: 'master-tools', component: TagComponent
    },
    {
      path: 'master-skills', component: SubCategoryComponent
    },
    {
      path: 'master-languages', component: TagValueComponent
    }
];


@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent, TagComponent, TagValueComponent],
  imports: [
    CommonModule, TooltipModule, FormsModule, ReactiveFormsModule, SharedModule, NgxLoadingModule,ToastrModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class MasterModule { }
