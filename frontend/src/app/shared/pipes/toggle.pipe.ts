import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toggle'
})
export class TogglePipe implements PipeTransform {

    transform(validation: boolean, ifTrue: string, ifFalse: string = ''): string {
        return validation ? ifTrue : ifFalse;
    }
}
