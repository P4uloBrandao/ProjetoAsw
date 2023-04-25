import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoungeComponent } from './lounge.component';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';



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
        path: 'add-products',
        component: AddProductComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
            canActivate: [AdminGuard],
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      // //   {
      // //     path: 'deals',
          // loadChildren: () =>
          //   import('./deals/deals.module').then((m) => m.DealsModule),
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
  declarations: [LoungeComponent, UserComponent, AddProductComponent, ProductsComponent],
  imports: [
    RouterModule.forChild(LOUNGE_ROUTES),
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    NgxDropzoneModule,
    FormsModule,
  ],
})
export class LoungeModule {}
