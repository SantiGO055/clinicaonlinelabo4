import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turnos } from 'src/app/clases/turnos';
import { User } from 'src/app/clases/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  turnos:Turnos[] = [];
  especialidades= [];
  especialistas= [];
  espAux = [];
  mostrarTurnos:boolean = false;
  medicoSeleccionado:User;

  constructor(
    private fireSvc: FirebaseService
  ) {
   }

  ngOnInit(): void {


    this.fireSvc.getAllTurnos().subscribe((turnos)=>{
      
    });
    this.fireSvc.getEspecialidades().subscribe((especialidades)=>{
      
      
    });
    this.fireSvc.getAllUsers().subscribe((usuarios)=>{
      console.log(this.turnos);
      usuarios.forEach(usr => {
        if(usr.especialista){
          console.log(usr)
          console.log(usuarios)
          
          usr.descripcion.forEach(descr => {
              this.especialidades.push(JSON.parse(JSON.stringify(descr)));
          });
          this.especialistas.push(JSON.parse(JSON.stringify(usr)));
        }
        
      });
      
    });
  }
  

  chequearEspecialista(){
    this.especialistas.forEach((esp:User) => {
      esp.descripcion.forEach(especialidadEspecialista => {
        this.especialidades.forEach(especialidadesCargadas => {
            if(especialidadEspecialista == especialidadesCargadas){
                console.log(especialidadEspecialista)
            }
          });
          
        });
    });

  }
  mostrarHorarios(especialidadSeleccionada: Especialidad,especialista: User){
    this.mostrarTurnos = true;
    this.medicoSeleccionado = especialista;
    console.log(especialidadSeleccionada);
    console.log(this.medicoSeleccionado);

  }
}
