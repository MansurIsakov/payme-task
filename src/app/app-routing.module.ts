import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/features-routing.module').then(
        (m) => m.FeaturesRoutingModule
      ),
  },
  {
    path: '404-not-found',
    loadComponent: () =>
      import('./core/pages/error-404/error-404.component').then(
        (m) => m.Error404Component
      ),
  },
  {
    path: '505-internal-server-error',
    loadComponent: () =>
      import('./core/pages/error-505/error-505.component').then(
        (m) => m.Error505Component
      ),
  },
  { path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
