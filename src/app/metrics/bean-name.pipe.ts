import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'beanName'
})
export class BeanNamePipe implements PipeTransform {

  transform(name: string): string {
    const innerClasses = name.split('$').length > 1 ? name.split('$') : [];
    const packages = name.split('.').length > 1 ? name.split('.') : [];

    return innerClasses.pop() || packages.pop() || name;
  }

}
