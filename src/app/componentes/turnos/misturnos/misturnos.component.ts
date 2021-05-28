import { Component, OnInit } from '@angular/core';
import { EstadoTurno } from 'src/app/clases/estado-turno';
import { Estados, Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
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
  misTurnos: Turnos[] = [];
  estados: EstadoTurno[] = [];
  usuarioLogueado: User = new User();
  estadoTurno: EstadoTurno = new EstadoTurno();
  constructor(
    private fireSvc: FirebaseService,
    private alertas: AlertasService
  ) { }

  
  ngOnInit(): void {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    this.fireSvc.getAllEstados().subscribe(estados=>{
      this.estados = estados;
    });
    this.fireSvc.getAllTurnos().subscribe((turnos)=>{

      
      console.log(turnos)
      console.log(this.usuarioLogueado)
      turnos.forEach(turno => {
        if(this.usuarioLogueado.paciente){
          if(this.usuarioLogueado.uid == turno.paciente.uid){
  
            console.log("igual")
            this.misTurnos = turnos;
          }
          else{
            console.log("no es igual")
  
          }
        
        }
        else if(this.usuarioLogueado.especialista){

        }
        
      });

    });
  }
  cancelarTurno(turno: Turnos){
    this.alertas.mostraAlertaInput('Ingrese motivo de la cancelación').then(comentario=>{
      this.estadoTurno.turno = turno;
      
      this.estadoTurno.paciente = turno.paciente;
      this.estadoTurno.especialidad = turno.especialidad;
      this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
      this.estadoTurno.hora = this.estadoTurno.obtenerHora();
      this.estadoTurno.especialista = turno.especialista;
      this.estadoTurno.comentario = comentario;
      this.estadoTurno.estado = Estados.CANCELADO;
      turno.estado = Estados.CANCELADO;
      
    // especialista: User;
    // paciente: User;
    // fecha: string;
    // hora:string;
    // estado: string;
    // turno: Turnos;
    // comentario?:  string;
    // diagnostico?: string;
    
      this.fireSvc.addEstado(this.estadoTurno,turno);

    });
  }
  verResenia(turno:Turnos){
    this.alertas.mostraAlertaSimpleSuccess(turno.resenia,'Reseña del turno');

  }
  calificarAtencion(turno: Turnos){
    console.log(turno);
    this.alertas.mostraAlertaInput('Ingrese comentario sobre la atencion del especialista ' + turno.especialista.nombre +", " +turno.especialista.apellido).then(texto=>{

      this.estados.forEach(element => {
        console.log(element)
        console.log(turno.id)
        if(turno.id == element.turno.id){
          this.estadoTurno.id = element.id;
          this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
          this.estadoTurno.hora = this.estadoTurno.obtenerHora();
          this.estadoTurno.estado = element.estado;

          this.estadoTurno.especialista = turno.especialista;
          this.estadoTurno.especialidad = turno.especialidad;
          
          this.estadoTurno.resenia = texto;
          turno.resenia = texto;
          this.estadoTurno.turno = turno;
          if(this.usuarioLogueado.paciente){
            this.estadoTurno.paciente = this.usuarioLogueado;
          }
          this.fireSvc.addEstado(this.estadoTurno,turno);
          
  
          
        }
      });
    });
  }

}
