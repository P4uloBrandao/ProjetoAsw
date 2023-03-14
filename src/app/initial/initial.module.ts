import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routes, RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { SidebarComponent } from "../shared/components/sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { InitialComponent } from "./initial.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


const INITIAL_ROUTES: Routes = [
  {
    path: '',
    component: InitialComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    InitialComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule.forChild(INITIAL_ROUTES),
    SharedModule,
  ],
})
export class InitialModule {}
