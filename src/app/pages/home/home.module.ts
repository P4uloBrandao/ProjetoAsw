import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule,Router } from '@angular/router';
import { HomeComponent } from './home.component';
//import { AddProductComponent } from 'src/app/componentes/add-product/add-product.component';
import { ProductsPageComponent } from 'src/app/componentes/products-page/products-page.component';
//import { UserComponent } from 'src/app/componentes/user/user.component';
import { SidebarComponent } from 'src/app/componentes/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from 'src/app/componentes/add-product/add-product.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UserComponent } from 'src/app/componentes/user/user.component';
import { FavoritosComponent } from 'src/app/componentes/favoritos/favoritos.component';
import { PagarComponent } from 'src/app/componentes/pagar/pagar.component';
import { ChatComponent } from 'src/app/componentes/chat/chat.component';
import { ChatRoomComponent } from 'src/app/componentes/chat-room/chat-room.component';




const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'vender',
        component: AddProductComponent
      },
      {
        path: 'perfil',
        component: UserComponent
      },
      {
        path: 'favoritos',
        component:FavoritosComponent,
      
      },
      {
        path: 'pagar',
        component:PagarComponent,
      
      },
      {
        path: 'chat-room',
        component:ChatRoomComponent,
      
      },

      {
        path: 'chat',
        component:ChatComponent,
      
      },
      {
        path: 'home',
        component: ProductsPageComponent,
        data: {
          config:'home'
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
    HomeComponent,
    SidebarComponent,
 

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxDropzoneModule

    
  
  ]
})
export class HomeModule { }
