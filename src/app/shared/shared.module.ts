import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
    

  ],
  exports: [FilterPipe],
})
export class SharedModule {}
