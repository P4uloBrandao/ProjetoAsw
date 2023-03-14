import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoungeComponent } from './lounge.component';
import { UserComponent } from './user/user.component';

const LOUNGE_ROUTES: Routes = [
  {
    path: '',
    component: LoungeComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      // //   {
      // //     path: 'deals',
      // //     loadChildren: () =>
      // //       import('./deals/deals.module').then((m) => m.DealsModule),
      // //     canActivate: [AuthenticatedRouteGuard, LoungeRouteGuard],
      // //   },
      //   {
      //     path: '',
      //     redirectTo: 'deals',
      //     pathMatch: 'full',
      //   },
      //   {
      //     path: '**',
      //     redirectTo: '',
      //     pathMatch: 'full',
      //   },
    ],
  },
];

@NgModule({
  declarations: [LoungeComponent, UserComponent],
  imports: [
    RouterModule.forChild(LOUNGE_ROUTES),
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule
  ],
})
export class LoungeModule {}
