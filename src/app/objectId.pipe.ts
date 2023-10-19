import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectId'
})
export class ObjectIdPipe implements PipeTransform {
  transform(value: any): string {
    if (value && value.$oid) {
      return `ObjectId("${value.$oid}")`;
    }
    return JSON.stringify(value);
  }
}
