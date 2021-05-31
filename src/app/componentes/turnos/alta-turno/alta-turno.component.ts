import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  turno:Turnos = new Turnos();
  especialidades= [];
  especialistas= [];
  pacientes= [];
  espAux = [];
  mostrarTurnos:boolean = false;
  medicosSeleccionados:User[]=[];
  medicoSeleccionado:User;
  usuarioLogueado:User;
  especialidadSeleccionada:any;
  public isCollapsed: boolean[] = [];
  muestroEspecialidades:boolean = false;
  muestroMedicos:boolean = false;
  pacienteSeleccionado:User;
  mostrarMensajeSeleccion: boolean = false;
  mostrarMensajePaciente: boolean = false;
  mostrarBotonConfirmar: boolean = false;
  seleccionePaciente: boolean = false;
  medicoString: string = 'Medico';
  seleccioneMedico: boolean= false;
  seleccioneEspecialidad: boolean= false;
  listadoTurnos: any;

  constructor(
    private fireSvc: FirebaseService,
    private alerta: AlertasService,
    private router: Router
    
  ) {
   }
   
  ngOnInit(): void {

    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    
    
    this.fireSvc.getEspecialidades().subscribe((especialidades)=>{
      // console.log(especialidades);
      especialidades.forEach(element => {
        
        this.especialidades.push(element.nombre);
        this.muestroEspecialidades = true;
      });
      
    });
    this.fireSvc.getAllUsers().subscribe((usuarios)=>{
      // console.log(this.turno);
      usuarios.forEach(usr => {
        if(usr.especialista){
          // console.log(usr)
          
          this.especialistas.push(JSON.parse(JSON.stringify(usr)));
        }
        if(usr.paciente == true){
          this.pacientes.push(JSON.parse(JSON.stringify(usr)));
        }
        
      });
      
    });
  }
  capturarEsp(especialidad:string){
    
    this.medicoSeleccionado = new User();
    this.pacienteSeleccionado = new User();
    this.turno = new Turnos();
    this.mostrarMensajeSeleccion = false;
    this.mostrarMensajePaciente = false;
    this.muestroMedicos = false;
    // console.log(this.medicoString);

    this.especialidadSeleccionada = especialidad;
    // console.log(especialidad)
   this.mostrarTurnos = false;
   this.muestroMedicos = true;
    this.medicosSeleccionados.splice(0);
  //  console.log(this.especialistas);
   this.especialistas.forEach((espEsp: User) => {
     //TODO chequear esto
    // console.log(espEsp)
    if(espEsp.disponibilidadEsp){

    
     espEsp.disponibilidadEsp.forEach(esp => {
        //  console.log(esp)
        esp.horarios.forEach(hora => {
          // console.log(hora);
          if(hora.disponible){
  
            if(esp.especialidad == especialidad){
              
              this.muestroMedicos = true;
              if(this.medicosSeleccionados.length > 0){
                this.medicosSeleccionados.forEach(element => {
                  if(element.uid === espEsp.uid){
     
                  }
                  else{
                    this.medicosSeleccionados.push(espEsp);
                     // console.log(espEsp);
                     
          
                     // console.log(this.medicosSeleccionados);
                     
                     
                   }
                  
                });
              }
              else{
                this.medicosSeleccionados.push(espEsp);
     
                
              }
            }
          }
        });
         
     });
    }
   });
  }
  capturarMed(medico: User){
    this.mostrarTurnos = true;
    this.mostrarMensajeSeleccion = false;
    this.mostrarMensajePaciente = false; 
   this.medicoSeleccionado = medico;
   
  //  console.log(this.medicoSeleccionado);
   
  }
  tomarTurno(fecha:string, horario: string,medico: User){
    // console.log(fecha)
    // console.log(horario)
  
    
   this.mostrarMensajeSeleccion = true;
   //  console.log(this.especialidadSeleccionada)
    this.turno.especialidad = this.especialidadSeleccionada;
    this.turno.especialista = JSON.parse(JSON.stringify(medico));;
    this.turno.fecha = fecha;
    this.turno.hora = horario;
    this.fireSvc.updateUsuario(this.medicoSeleccionado);
    this.fireSvc.addTurno(this.turno);
    this.alerta.mostraAlertaSimple('Turno confirmado correctamente para ' + this.turno.fecha + " a las "+ this.turno.hora,'Turno confirmado');
    this.router.navigate(['/']);
    
    console.log(this.turno);
  }
  seleccionPaciente(paciente:User){
   this.mostrarMensajePaciente = true;
   this.seleccionePaciente = true;
    this.pacienteSeleccionado = paciente;
    // console.log(this.pacienteSeleccionado);
  }
  confirmarTurno(){
    // console.log(this.medicoSeleccionado);
    if(this.usuarioLogueado.admin){
      this.turno.paciente = this.pacienteSeleccionado;
    }
    else if(this.usuarioLogueado.paciente){
     this.turno.paciente = this.usuarioLogueado;
    }
    if(this.medicosSeleccionados != null){

        //TODO subir turno y modificar el usuario con el turno no disponible en esa fecha
        console.log("confirme turno")
        console.log(this.medicoSeleccionado);

        // for (let i = 0; i < this.medicoSeleccionado.disponibilidadEsp.length; i++) {
          // const element = this.medicoSeleccionado.disponibilidadEsp[i];
        //  console.log(element);
        //  console.log(this.turno);
        // if(this.turno.fecha == this.medicoSeleccionado.disponibilidadEsp[i].fecha 
        //   && this.turno.especialidad == this.turno.especialidad
          
        //   ){
        //     for (let j = 0; j < this.medicoSeleccionado.disponibilidadEsp[i].horarios.length; j++) {
        //       const element = this.medicoSeleccionado.disponibilidadEsp[i].horarios[j];
              
        //       if(this.turno.hora == this.medicoSeleccionado.disponibilidadEsp[i].horarios[j].hora)
        //       {
        //         console.log("horario ok");
        //         console.log(this.medicoSeleccionado.disponibilidadEsp[i].horarios);
        //         this.medicoSeleccionado.disponibilidadEsp[i].horarios[j].disponible = false;
        //       }
        //     }
            
        this.medicoSeleccionado.disponibilidadEsp.forEach(turno => {
          // if(turno.especialidad == )
          turno.horarios.forEach(element => {
            
          });
          // if(turno)
        }); 

          // this.turno.especialista = 
          this.turno.especialista.disponibilidadEsp = null;
          this.turno.especialista.descripcion = null;
          console.log(this.turno);
          console.log(this.medicoSeleccionado);
          // this.fireSvc.updateUsuario(this.medicoSeleccionado);
          // this.fireSvc.addTurno(this.turno);
          // this.router.navigate(['/']);
            
          // }
          
        // }
      //  this.medicoSeleccionado.disponibilidadEsp.forEach(element => {
      //    console.log(element.especialidad)
      //    console.log(this.especialidadSeleccionada)
      //      console.log("hola");
      //      let aux = {
      //        disponibilidad: false,
      //        especialidad: this.especialidadSeleccionada,
      //        fechayhora: this.turno.fecha
      //      }
            
      //      element = aux;

      //     console.log(element);
      //     // this.fireSvc.updateUsuario()
      //     console.log(this.medicoSeleccionado)
          
          
      //  });
         
    }
   //  if(this.alerta.mostraAlertaTurno('Desea confirmar turno?','Confirmar turno')){
   //    this.medicoSeleccionado.disponibilidadEsp.forEach((asd)=>{
   //     console.log(asd);
   //    })
   //    /** ADD turno */
   //   // this.fireSvc
   //  }
  }
  

  chequearEspecialista(){
    this.especialistas.forEach((esp:User) => {
      esp.descripcion.forEach(especialidadEspecialista => {
        this.especialidades.forEach(especialidadesCargadas => {
            if(especialidadEspecialista == especialidadesCargadas){
                // console.log(especialidadEspecialista)
            }
          });
          
        });
    });

  }
  // mostrarHorarios(especialidadSeleccionada: Especialidad,especialista: User){
  //   this.mostrarTurnos = true;
  //   this.medicosSeleccionados = especialista;
  //   console.log(especialidadSeleccionada);
  //   console.log(this.medicosSeleccionados);

  // }
  public beforeChange($event: NgbPanelChangeEvent) {
    console.log($event)
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
  capturarMedicoSeleccion(e){
    this.medicoSeleccionado = e;
    // console.log(this.medicoSeleccionado);
    
    this.seleccioneMedico = true;
    this.listadoTurnos = this.medicoSeleccionado.disponibilidadEsp;

    console.log(this.listadoTurnos);
  }
  capturarEspSeleccionada(e){
    this.especialidadSeleccionada = e;

    this.seleccioneEspecialidad = true;
    // if(this.medicoSeleccionado.disponibilidadEsp.length > 0 && this.medicoSeleccionado.disponibilidadEsp != null){

    //   this.medicoSeleccionado.disponibilidadEsp.forEach(turnos => {
    //     if(turnos.especialidad == this.especialidadSeleccionada){
  
    //       this.listadoTurnos = turnos;
    //       console.log(this.listadoTurnos);
    //     }
    //   });
    // }
    
  }
  capturarEventoTomarTurno(e){
    console.log(this.medicoSeleccionado)
    this.tomarTurno(e.fecha,e.hora,this.medicoSeleccionado);
  }
}
