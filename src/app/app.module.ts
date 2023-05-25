import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CloudinaryModule} from '@cloudinary/ng';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './componentes/products/products.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ProductCardComponent } from './componentes/product-card/product-card.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeModule } from './pages/home/home.module';
import { LandingModule } from './pages/landing/landing.module';
import { ProductsPageComponent } from './componentes/products-page/products-page.component';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './componentes/add-product/add-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserComponent } from './componentes/user/user.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { PagarComponent } from './componentes/pagar/pagar.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { ChatRoomComponent } from './componentes/chat-room/chat-room.component';

@NgModule({
  declarations: [AppComponent,ProductsComponent,HeaderComponent,ProductCardComponent,LoginComponent,RegisterComponent, ProductsPageComponent,AddProductComponent,UserComponent,FavoritosComponent, PagarComponent, ChatComponent, ChatRoomComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSidenavModule,
    CloudinaryModule,
    MatSnackBarModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    NgxDropzoneModule,
    MatTableModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    




   


 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
