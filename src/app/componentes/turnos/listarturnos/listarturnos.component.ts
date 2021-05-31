import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-listarturnos',
  templateUrl: './listarturnos.component.html',
  styleUrls: ['./listarturnos.component.css']
})
export class ListarturnosComponent implements OnInit {
  
  @Input()especialidadSeleccionada: string;
  @Input()listadoTurnos: any;
  @Output()eventoSeleccionHorario: EventEmitter<any>  = new EventEmitter();
  @Input()medico: User;


  constructor() { }

  ngOnInit(): void {
    console.log(this.medico);
  }
  seleccionTurno(fecha:string, hora: string){

    console.log(fecha)
    console.log(hora)
    let objAux = {
      fecha: fecha,
      hora: hora,
      
    }

    this.eventoSeleccionHorario.emit(objAux)
  }
  

}
