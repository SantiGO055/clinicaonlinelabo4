import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  @Input()turnos: Turnos[];
  misTurnos: Turnos[] = [];
  allTurnos: Turnos[] = [];
  estados: EstadoTurno[] = [];
  usuarioLogueado: User = new User();
  estadoTurno: EstadoTurno = new EstadoTurno();
  turnoSeleccionado: Turnos;
  constructor(
    private fireSvc: FirebaseService,
    private alertas: AlertasService,
    private spinner: NgxSpinnerService,
  ) { }

  
  ngOnInit(): void {
    
    this.spinner.show();
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
          if(this.usuarioLogueado.uid == turno.especialista.uid){
  
            console.log("igual")
            
            this.misTurnos.push(turno);
          }
          else{
            console.log("no es igual")
  
          }
        }
        else{
          this.allTurnos.push(turno);
        }
        this.spinner.hide();
        
      });

    });
  }
  cancelarTurno(turno: Turnos){
    
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Cancelar turno','Ingrese motivo de la cancelación del turno').then(comentario=>{
      
      if(comentario != undefined){

        
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioPaciente = comentario;
        this.estadoTurno.estado = Estados.CANCELADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.CANCELADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);
    }
    });
  }
  rechazarTurno(turno: Turnos){
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Rechazar turno','Ingrese motivo del rechazo del turno').then(comentario=>{
      if(comentario != undefined){
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioMedico = comentario;
        this.estadoTurno.estado = Estados.RECHAZADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.RECHAZADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);

      }

    });
  }
  aceptarTurno(turno: Turnos){
    

    this.turnoSeleccionado = turno;
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.estado = Estados.ACEPTADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.ACEPTADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno).then(a=>{
        
        this.alertas.mostraAlertaSimpleSuccess('Turno aceptado','Estado de turno');
      });


      

  }
  finalizarTurno(turno:Turnos){
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Finalizar turno','Ingrese un comentario o reseña sobre la atencion del paciente').then(comentario=>{
      if(comentario != undefined){
        this.estadoTurno.turno = turno;
        
        this.estadoTurno.paciente = turno.paciente;
        this.estadoTurno.especialidad = turno.especialidad;
        this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
        this.estadoTurno.hora = this.estadoTurno.obtenerHora();
        this.estadoTurno.especialista = turno.especialista;
        this.estadoTurno.comentarioMedico = comentario;
        this.estadoTurno.estado = Estados.ACEPTADO;
        
      // especialista: User;
      // paciente: User;
      // fecha: string;
      // hora:string;
      // estado: string;
      // turno: Turnos;
      // comentario?:  string;
      // diagnostico?: string;
      
      this.turnoSeleccionado.estado = Estados.ACEPTADO;
      this.fireSvc.updateTurno(this.turnoSeleccionado);
      this.fireSvc.addEstado(this.estadoTurno,turno);

      }

    });

  }
  verResenia(turno:Turnos){
    this.alertas.mostraAlertaSimpleSinIcono(turno.resenia,'Reseña del turno');

  }
  calificarAtencion(turno: Turnos){
    console.log(turno);
    this.alertas.mostraAlertaInput('Calificar atención','Ingrese comentario sobre la atencion del especialista ' + turno.especialista.nombre +", " +turno.especialista.apellido).then(texto=>{

      if(texto != undefined){

        
          console.log(turno.id)
          // if(turno.id == element.turno.id){
            this.estadoTurno.id = turno.id;
            this.estadoTurno.fecha = this.estadoTurno.obtenerFecha();
            this.estadoTurno.hora = this.estadoTurno.obtenerHora();
            this.estadoTurno.estado = turno.estado;
  
            this.estadoTurno.especialista = turno.especialista;
            this.estadoTurno.especialidad = turno.especialidad;
            
            this.estadoTurno.comentarioPaciente = texto;
            turno.comentarioPaciente = texto;
            this.estadoTurno.turno = turno;
            if(this.usuarioLogueado.paciente){
              this.estadoTurno.paciente = this.usuarioLogueado;
            }
            this.fireSvc.addEstado(this.estadoTurno,turno);
            
    
            
          // }
      }
    });
  }
  completarEncuesta(turno:Turnos){
    
  }

}
