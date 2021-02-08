import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filenameExists'
})
export class FilenameExistsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): boolean {
    return value.includes('files');
  }

}
