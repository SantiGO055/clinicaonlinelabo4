import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPaciente'
})
export class FilterPacientePipe implements PipeTransform {

  transform(items: any, value: string): any {
    if(!value)return items;
      if(!items)return value;
      
      value = value.toLowerCase();
      return items.filter((data)=>{
        data.especialidad = data.especialidad.toLowerCase();
        
        // console.log(value)
        data.paciente.nombre = data.paciente.nombre.toLowerCase();
        data.paciente.apellido = data.paciente.apellido.toLowerCase();
        if(data.especialidad.includes(value) || data.paciente.nombre.includes(value) || data.paciente.apellido.includes(value)){
          console.log(data)
          return JSON.stringify(data).toLowerCase().includes(value);
        }
        else{
          return null;
        }
          
      });
  }

}
