import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { NotifierModule } from 'angular-notifier';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        PipesModule,
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: 'right'
                },
                vertical:{
                    position: 'top'
                }
            },
            behaviour: {
                autoHide: 4000,
                showDismissButton: false
            },
            animations: {
                enabled: true,
                show: {
                    preset: 'slide',
                    speed: 300,
                    easing: 'ease-in-out'
                },
                hide: {
                    preset: 'slide',
                    speed: 300,
                    easing: 'ease-in-out',
                    offset: 50
                },
            }
        })
    ]
})
export class AuthModule { }
