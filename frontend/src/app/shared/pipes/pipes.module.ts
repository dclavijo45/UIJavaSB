import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TogglePipe } from './toggle.pipe';



@NgModule({
    declarations: [
        TogglePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TogglePipe
    ]
})
export class PipesModule { }
