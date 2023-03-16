import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from './users/users.component';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      }
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [
    RouterModule.forChild(ADMIN_ROUTES),
    CommonModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class AdminModule {}
