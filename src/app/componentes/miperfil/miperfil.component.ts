import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  usuarioLogueado: User;
  disponibilidad: string;
  mostrarHorario: boolean;
  especialidad: string;
  disp:string[] = [];
  hoy: Date = new Date(Date.now());
  fechaSeleccionada = this.hoy.getFullYear()+'-'+(this.hoy.getMonth()+1)+'-'+this.hoy.getDate()+'T00:00:00';
  minimo = this.hoy.getFullYear()+'-0'+(this.hoy.getMonth()+1)+'-'+(this.hoy.getDate());
  horaSeleccionada: string = '';
  maximo = '2021-12-31';
  arrayHorarios:any[] = [];
  horariosAElegir: any[] = [];
  constructor(
    private fireSvc: FirebaseService
  ) { }

  botones = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',

]
  calculoHorarios(){

  }
  ngOnInit(): void {
    this.botones.forEach(element => {
      let horario = {
        hora: element,
        disponible: true
      }
      this.horariosAElegir.push(horario);
      
    });
    console.log(this.horariosAElegir);
    console.log(this.minimo)
    console.log(this.maximo)
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if(this.usuarioLogueado.especialista){

      console.log(this.usuarioLogueado);
      this.usuarioLogueado.disponibilidadEsp.forEach(esp=>{
        if(esp){

        }
        console.log(esp);
        this.disp.push(JSON.parse(JSON.stringify(esp)));
        console.log(this.disp);
  
      })
    }
  }
  capturarHora(e){
    // console.log(e)
    
    

      this.horariosAElegir.forEach(element => {
        if(e.target.checked){
            if(element.hora == e.target.value){
      
              
              this.arrayHorarios.push(element);
            }
        }
        else{
          if(element.hora == e.target.value){
            let i = this.arrayHorarios.indexOf( element)
            this.arrayHorarios.splice(i,1);
            console.log(this.arrayHorarios);
            
          }
        }
      });
      console.log(this.arrayHorarios);

    
    

  }
  
  mostrarHorarios(){
    this.mostrarHorario = true;
    console.log(this.minimo)
    console.log(this.maximo)
    console.log(this.fechaSeleccionada);
  }
  seleccionDispo(){
    // console.info(this.especialidad)
    console.log()
    const prueba = {
      especialidad: this.especialidad,
      fecha: this.fechaSeleccionada,
      horarios: this.arrayHorarios,
    };
    
    // console.info(prueba);
    this.disp.push(JSON.parse(JSON.stringify(prueba)));
    
    
    this.usuarioLogueado.disponibilidadEsp = this.disp;
    // this.usuarioLogueado.disponibilidadEsp.slice(0,1)
    // console.log(this.usuarioLogueado)
    this.fireSvc.updateUsuario(this.usuarioLogueado);
    
    console.log(this.usuarioLogueado.disponibilidadEsp);
  }
  capturarSelectEspecialidad(value){
    console.log(value);
    
    this.especialidad = value.$ngOptionLabel.trim();
    console.info()
  }

}
