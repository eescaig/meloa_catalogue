import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringPipe'})
export class TransformStringPipe implements PipeTransform {

    transform(item: string): any {
       let transformedItem : string = item.split("-")
                                            .map(item => item.charAt(0).toUpperCase() + item.substr(1, item.length))
                                            .join(" ");
       return transformedItem;
    }
}
