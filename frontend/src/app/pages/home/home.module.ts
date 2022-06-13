import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './components/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        HomeRoutingModule,
        RouterModule
    ]
})
export class HomeModule { }
