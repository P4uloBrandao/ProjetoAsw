// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AccessKeyRouteGuard } from '@app/shared/guards/access-key.guard';
// import { AuthenticatedRouteGuard } from '@app/shared/guards/authenticated.guard';
// import { LoungeRouteGuard } from '@app/shared/guards/lounge.guard';
// import { PartnerLogoBase64Resolve } from '@app/shared/resolvers/partner-logo-base64.resolve';
// import { SharedModule } from '@app/shared/shared.module';
// import { LoungeComponent } from './lounge.component';

// const LOUNGE_ROUTES: Routes = [
//   {
//     path: '',
//     component: LoungeComponent,
//     resolve: { logo: PartnerLogoBase64Resolve },
//     children: [
//       {
//         path: 'deals',
//         loadChildren: () =>
//           import('./deals/deals.module').then((m) => m.DealsModule),
//         canActivate: [AuthenticatedRouteGuard, LoungeRouteGuard],
//       },
//       {
//         path: 'benefits',
//         loadChildren: () =>
//           import('./benefits/benefits.module').then((m) => m.BenefitsModule),
//         canActivate: [AuthenticatedRouteGuard, LoungeRouteGuard],
//       },
//       {
//         path: 'quick-consult',
//         loadChildren: () =>
//           import('./access-key/access-key.module').then(
//             (m) => m.AccessKeyModule
//           ),
//         canActivate: [AccessKeyRouteGuard],
//       },
//       {
//         path: 'news',
//         loadChildren: () =>
//           import('./news/news.module').then((m) => m.NewsModule),
//       },
//       {
//         path: 'services',
//         loadChildren: () =>
//           import('./services/services.module').then((m) => m.ServicesModule),
//         canActivate: [AuthenticatedRouteGuard, LoungeRouteGuard],
//       },
//       {
//         path: 'support-material',
//         loadChildren: () =>
//           import(
//             './support-material-client/support-material-client.module'
//           ).then((m) => m.SupportMaterialClientModule),
//       },
//       {
//         path: 'support',
//         loadChildren: () =>
//           import('./support/support.module').then((m) => m.SupportModule),
//       },
//       {
//         path: '',
//         redirectTo: 'deals',
//         pathMatch: 'full',
//       },
//       {
//         path: '**',
//         redirectTo: '',
//         pathMatch: 'full',
//       },
//     ],
//   },
// ];

// @NgModule({
//   declarations: [LoungeComponent],
//   imports: [RouterModule.forChild(LOUNGE_ROUTES), SharedModule],
// })
// export class LoungeModule {}
