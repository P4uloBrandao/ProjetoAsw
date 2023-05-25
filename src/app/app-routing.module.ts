import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { UnauthenticadedGuard } from './shared/guards/unauthenticaded.guard';
import { LoginComponent } from './componentes/login/login.component';
import { ProductsComponent } from './componentes/products/products.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LandingModule } from './pages/landing/landing.module';
import { HomeModule } from './pages/home/home.module';
const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingModule),
      // canActivate: [UnauthenticadedGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
      canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
