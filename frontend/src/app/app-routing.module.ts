import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: ()=> import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'profile',
        loadChildren: ()=> import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
