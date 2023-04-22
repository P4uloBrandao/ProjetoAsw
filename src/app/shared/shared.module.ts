import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [SidebarComponent, ProductCardComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule
  ],
  exports: [SidebarComponent, ProductCardComponent],
})
export class SharedModule {}
