import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './components/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NotifierModule } from 'angular-notifier';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
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
        }),
        PipesModule
    ]
})
export class ProfileModule { }
