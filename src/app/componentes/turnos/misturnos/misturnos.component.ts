import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  textoABuscar: string = '';
  descripcionBajaTurno: string = '';
  turnos: Turnos[] = [];
  constructor(
    private fireSvc: FirebaseService,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    this.fireSvc.getAllTurnos().subscribe((turnos)=>{

      console.log(turnos)
      this.turnos = turnos;

    });
  }

}
