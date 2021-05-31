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
  diaSeleccionado: Date = new Date();
  fechaSeleccionada = this.hoy.getFullYear()+'-'+(this.hoy.getMonth()+1)+'-'+this.hoy.getDate()+'T00:00:00';
  minimo = this.hoy.getFullYear()+'-0'+(this.hoy.getMonth()+1)+'-'+(this.hoy.getDate());
  horaSeleccionada: string = '';
  maximo = '2021-12-31';
  arrayHorarios:any[] = [];
  horariosAElegir: any[] = [];
  sliderHoraComienzo: number;
  sliderCantTurnos: number;
  sliderDiaSemana: number = 1;
  sliderDiaSemanaString: string = 'Lunes';
  maxSliderTurno: number = 22;
  maxSliderHora: number = 19;
  constructor(
    private fireSvc: FirebaseService
  ) {
    console.log(this.sliderHoraComienzo);
   }

  calcularSlider(){


    var currentDay = this.hoy.getDay();
    var distance = this.sliderDiaSemana - currentDay;
    this.diaSeleccionado.setDate(this.hoy.getDate() + distance);
    console.log(this.diaSeleccionado);


    if(this.sliderDiaSemana == 1){
      this.sliderDiaSemanaString = 'Lunes';
      this.maxSliderHora = 19;

    }
    if(this.sliderDiaSemana == 2){
      this.sliderDiaSemanaString = 'Martes';
      this.maxSliderHora = 19;


    }
    if(this.sliderDiaSemana == 3){
      this.sliderDiaSemanaString = 'Miercoles';
      this.maxSliderHora = 19;

    }
    if(this.sliderDiaSemana == 4){
      this.sliderDiaSemanaString = 'Jueves';
      this.maxSliderHora = 19;

    }
    if(this.sliderDiaSemana == 5){
      this.sliderDiaSemanaString = 'Viernes';
      this.maxSliderHora = 19;
    }
    if(this.sliderDiaSemana == 6){
      this.sliderDiaSemanaString = 'Sabado';
      this.maxSliderHora = 14;
    }
    console.log(this.sliderDiaSemanaString);
    switch(this.sliderHoraComienzo){
      case 19:
        this.maxSliderTurno = 0;

        break;
      case 18:
        this.maxSliderTurno = 2;

        break;
      case 17:
        this.maxSliderTurno = 4;

        break;
      case 16:
        this.maxSliderTurno = 6;

        break;
      case 15:
        this.maxSliderTurno = 8;
        break;
      case 14:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 0;

        }
        else{

          this.maxSliderTurno = 10;
        }
        break;
      case 13:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 2;

        }
        else{

          this.maxSliderTurno = 12;
        }
        break;
      case 12:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 4;

        }
        else{

          this.maxSliderTurno = 14;
        }
        break;
      case 11:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 6;

        }
        else{

          this.maxSliderTurno = 16;
        }
        break;
      case 10:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 8;

        }
        else{

          this.maxSliderTurno = 18;
        }
        break;
      case 9:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 10;

        }
        else{

          this.maxSliderTurno = 20;
        }
        break;
      case 8:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 12;

        }
        else{

          this.maxSliderTurno = 22;
        }
        break;
    }
  }
//   botones = [
//     '8:00',
//     '8:30',
//     '9:00',
//     '9:30',
//     '10:00',
//     '10:30',
//     '11:00',
//     '11:30',
//     '12:00',
//     '12:30',
//     '13:00',
//     '13:30',
//     '14:00',
//     '14:30',
//     '15:00',
//     '15:30',
//     '16:00',
//     '16:30',
//     '17:00',
//     '17:30',
//     '18:00',
//     '18:30',
//     '19:00',

// ]
  calculoHorarios(){

  }
  ngOnInit(): void {

    this.sliderDiaSemanaString = 'Lunes';

    // this.botones.forEach(element => {
    //   let horario = {
    //     hora: element,
    //     disponible: true
    //   }
    //   this.horariosAElegir.push(horario);
      
    // });
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
  seleccionDispo(especialidad: string){

    //TODO continuar esto
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
