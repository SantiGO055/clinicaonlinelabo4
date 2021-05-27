import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {

  
  transform(items: any, value: string): any {
    if(!value)return items;
      if(!items)return value;
      
      value = value.toLowerCase();
      return items.filter((data)=>{
      console.log(data)
      console.log(value)
          
        return JSON.stringify(data).toLowerCase().includes(value);
      });
  }

}
