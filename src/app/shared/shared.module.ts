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
import { RodapeUsuarioComponent } from './components/rodape-usuario/rodape-usuario.component';
import { BotaoMenuComponent } from './components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  declarations: [SidebarComponent, ProductCardComponent, ProductCardComponent, RodapeUsuarioComponent, BotaoMenuComponent, HeaderComponent, FilterPipe],
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
  exports: [SidebarComponent, ProductCardComponent,HeaderComponent,FilterPipe],
})
export class SharedModule {}
