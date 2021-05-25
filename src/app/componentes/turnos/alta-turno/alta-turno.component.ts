import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';

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
  especialidadSeleccionada:string;
  public isCollapsed: boolean[] = [];
  muestroEspecialidades:boolean = false;
  muestroMedicos:boolean = false;
  pacienteSeleccionado:User;
  mostrarMensajeSeleccion: boolean = false;
  mostrarMensajePaciente: boolean = false;
  mostrarBotonConfirmar: boolean = false;
  

  constructor(
    private fireSvc: FirebaseService,
    private alerta: AlertasService
  ) {
   }
   
  ngOnInit(): void {

    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    this.fireSvc.getAllTurnos().subscribe((turnos)=>{
      
    });
    
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
          // console.log(usuarios)
          this.especialistas.push(JSON.parse(JSON.stringify(usr)));
        }
        if(usr.paciente){
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


    this.especialidadSeleccionada = especialidad;
    // console.log(especialidad)
   this.mostrarTurnos = false;
   this.muestroMedicos = true;
    this.medicosSeleccionados.splice(0);
   console.log(this.especialistas);
   this.especialistas.forEach((espEsp: User) => {
     //TODO chequear esto
    console.log(espEsp)
    if(espEsp.disponibilidadEsp){

    
     espEsp.disponibilidadEsp.forEach(esp => {
        //  console.log(esp)
        if(esp.especialidad == especialidad && esp.disponible){
          this.medicosSeleccionados.push(espEsp);
          this.muestroMedicos = true;
          if(this.medicosSeleccionados.length > 0){
            this.medicosSeleccionados.forEach(element => {
              if(element.uid === espEsp.uid){
 
              }
              else{
               
                 // console.log(espEsp);
                 
      
                 // console.log(this.medicosSeleccionados);
                 
                 
               }
              
            });
          }
          else{
            if(esp.disponible){
              this.medicosSeleccionados.push(espEsp);
 
            }
          }
        }
         
     });
    }
   });
  }
  capturarMed(medico: User){
    this.mostrarTurnos = true;
    this.mostrarMensajeSeleccion = false;
    this.mostrarMensajePaciente = false; 
   this.medicoSeleccionado = medico;
   
   console.log(this.medicoSeleccionado);
   
  }
  tomarTurno(horario: string,medico: User){
    this.mostrarBotonConfirmar = true;
    if(this.usuarioLogueado.paciente){
      
    }
   this.mostrarMensajeSeleccion = true;
   //  console.log(this.especialidadSeleccionada)
    this.turno.especialidad = this.especialidadSeleccionada;
    this.turno.especialista = medico;
    this.turno.fecha = horario;
    if(this.usuarioLogueado.admin){

    }
    else if(this.usuarioLogueado.paciente){
     this.turno.paciente = this.usuarioLogueado;
    }
   //  console.log(this.turno);
  }
  seleccionPaciente(paciente:User){
   this.mostrarMensajePaciente = true;
    this.pacienteSeleccionado = paciente;
    this.turno.paciente = this.pacienteSeleccionado;
  }
  confirmarTurno(){
    console.log(this.medicoSeleccionado);
    if(this.medicosSeleccionados != null){

    
     this.alerta.mostraAlertaTurno('Desea confirmar turno?','Confirmar turno').then(()=>{
       if(this.alerta.confirmoTurno){
         //TODO subir turno y modificar el usuario con el turno no disponible en esa fecha
         console.log("confirme turno")
         //this.fireSvc.addTurno(this.turno)
         this.medicoSeleccionado.disponibilidadEsp.forEach(element => {
           console.log(element.especialidad)
           console.log(this.especialidadSeleccionada)
           if(element.especialidad == this.especialidadSeleccionada){
             console.log("hola");
             let aux = {
               disponibilidad: false,
               especialidad: this.especialidadSeleccionada,
               fechayhora: this.turno.fecha
             }
             
             element = aux;

            console.log(element);
            // this.fireSvc.updateUsuario()
            console.log(this.medicoSeleccionado)
           }
           
         });
         
       }
       else{
         console.log("no confirme turno")
       }
     });
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
}
