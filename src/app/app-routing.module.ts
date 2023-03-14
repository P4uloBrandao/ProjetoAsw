import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { UnauthenticadedGuard } from './shared/guards/unauthenticaded.guard';

const routes: Routes = [
  {
    path: 'initial',
    loadChildren: () =>
      import('./initial/initial.module').then((m) => m.InitialModule),
      canActivate: [UnauthenticadedGuard],
  },
  {
    path: 'lounge',
    loadChildren: () =>
      import('./lounge/lounge.module').then((m) => m.LoungeModule),
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  { path: '**', redirectTo: 'initial' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
