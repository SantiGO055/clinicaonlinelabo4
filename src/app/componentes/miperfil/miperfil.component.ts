import { Component, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { Horarios, Turnoesp, User } from 'src/app/clases/user';
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
  disp:Turnoesp[] = [];
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
  turnoAux: Turnoesp;
  historia: Historia;
  flag: boolean = false;

  constructor(
    private fireSvc: FirebaseService
  ) {
    console.log(this.sliderHoraComienzo);
   }

  calcularSlider(){
    var date = new Date(this.hoy.getTime());
    date.setDate(date.getDate() + (this.sliderDiaSemana +-1) - (date.getDay() + 6) % 7);

    let fecha = date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
    this.fechaSeleccionada = fecha;
    // var currentDay = this.hoy.getDay();
    // console.log(currentDay);
    // var distance = (this.sliderDiaSemana +1) - currentDay;
    // console.log(distance);

    // this.diaSeleccionado.setDate(this.hoy.getDate() + distance);
    // console.log(this.diaSeleccionado);

    

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
    console.log(this.sliderHoraComienzo);
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

  ngOnInit(): void {

    this.flag = true;
    
    this.fireSvc.getAllHistorias().subscribe(historia=>{
      historia.forEach(histo => {
        if(histo.turno.paciente.uid === this.usuarioLogueado.uid){
          this.historia = histo;
          this.flag = false;
        }
      });
      
      
    });

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
      if(this.usuarioLogueado.disponibilidadEsp != undefined){
        this.usuarioLogueado.disponibilidadEsp.forEach(esp=>{
          if(esp){
  
          }
          console.log(esp);
          this.disp.push(JSON.parse(JSON.stringify(esp)));
          console.log(this.disp);
    
        })

      }
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

  calcularArrayHorarios(especialidad:string){
    let aux: number;
    let auxArr: Horarios[] = [];
    let auxStr:any;
    let horarios:any;
    //TODO a la hora de inicio del turno le sumo 0 por el primer turno y 0.30 por cada turno de mas
    //TODO si empiezo a las 10 hs y tengo 3 turnos le sumo 10 + 0 (1 turno) 10+0.30 (2 turnos) 10+0.30 (3 turnos)
    if(this.sliderCantTurnos)
    for (let i = 0; i < this.sliderCantTurnos; i++) {
      
      
      if(i == 0){
        aux = this.sliderHoraComienzo;
        auxStr = aux.toString()
          auxStr = auxStr + ':00';
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
      }
      else{

        aux += 0.50;
        if(aux % 1 == 0){
          auxStr = aux.toString()
          auxStr = auxStr + ':00';
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
        }
        else{
          auxStr = aux.toString().split('.');
          auxStr[1] = "30";
    
          auxStr = auxStr[0]+':'+auxStr[1];
          // horarios.hora = auxStr;
          // horarios.disponible = true;
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
        }
        
        // console.log(auxStr);
        
      }
      // console.log(auxArr);
      
    }
    // auxArr contiene horarios y disponibilidad de cada uno
    
    
    // console.log(auxStr[0]+':'+auxStr[1]);

    this.turnoAux = {
      especialidad: especialidad,
      fecha: this.fechaSeleccionada,
      horarios: auxArr
    }
    this.disp.push(JSON.parse(JSON.stringify(this.turnoAux)));

    
    
  }

  seleccionDispo(especialidad: string){

    //TODO continuar esto
    // console.info(this.especialidad)
    console.log()

    const prueba = {
      especialidad: especialidad,
      fecha: this.fechaSeleccionada,
      horarios: this.arrayHorarios,
    };
    console.log(prueba);
    
    this.calcularArrayHorarios(especialidad);
    console.log(this.disp);
    this.usuarioLogueado.disponibilidadEsp = this.disp;
    this.fireSvc.updateUsuario(this.usuarioLogueado);
  //   export class Turnoesp {
  //     especialidad:string;
  //     fecha: string;
  //     horarios: Horarios[];
  // }

    
    // console.info(prueba);
    // this.disp.push(JSON.parse(JSON.stringify(prueba)));
    
    
    // this.usuarioLogueado.disponibilidadEsp = this.disp;
    // this.usuarioLogueado.disponibilidadEsp.slice(0,1)
    // console.log(this.usuarioLogueado)
    // this.fireSvc.updateUsuario(this.usuarioLogueado);
    
    // console.log(this.usuarioLogueado.disponibilidadEsp);
  }
  capturarSelectEspecialidad(value){
    console.log(value);
    
    this.especialidad = value.$ngOptionLabel.trim();
    console.info()
  }

}
