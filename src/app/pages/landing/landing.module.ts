import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule,Router } from '@angular/router';
import { LandingComponent } from './landing.component';
import { RegisterComponent } from 'src/app/componentes/register/register.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { ProductsPageComponent } from 'src/app/componentes/products-page/products-page.component';

const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: ProductsPageComponent,
         data: {
          config:''
        }

      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LANDING_ROUTES),
  ]
})
export class LandingModule { 
  constructor(private router: Router){

  }

}
