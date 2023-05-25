import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value : any[], filterString: string, propNames:string[]): any[] {
    const result:any =[];
    if(!value || filterString==='' || propNames.length === 0) {
      return value;
    }
    value.forEach((a:any)=>{
      let found = false;
      for (let i = 0; i < propNames.length; i++) {
        if(a[propNames[i]] && a[propNames[i]].trim().toLowerCase().includes(filterString.toLowerCase())) {
          found = true;
          break;
        }
      }
      if (found) {
        result.push(a);
      }
    });
    return result;
  }
  

}
