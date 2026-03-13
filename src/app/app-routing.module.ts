import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageErrorComponent } from './shared/page-error/page-error.component';

const routes: Routes = [

  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./login-auth/login-auth.module').then(m => m.LoginAuthModule)
  },
  {
    path: 'main', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {path: '404', component: PageErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
