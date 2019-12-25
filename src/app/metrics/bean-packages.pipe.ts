import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'beanPackages'
})
export class BeanPackagesPipe implements PipeTransform {

  transform(name: string): string {
    return name.replace(/\./g, '\n');
  }
}
