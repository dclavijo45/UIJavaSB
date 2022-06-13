import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/shared/guards/login.guard';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [
            LoginGuard
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
