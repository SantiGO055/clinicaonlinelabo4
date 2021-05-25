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
  especialidad: string;
  disp:string[] = [];
  constructor(
    private fireSvc: FirebaseService
  ) { }

  ngOnInit(): void {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if(this.usuarioLogueado.especialista){

      console.log(this.usuarioLogueado);
      // this.usuarioLogueado.disponibilidadEsp.forEach(esp=>{
      //   if(esp){

      //   }
      //   console.log(esp);
      //   this.disp = this.usuarioLogueado.disponibilidad;
      //   console.log(this.disp);
  
      // })
    }
  }
  seleccionDispo(){
    // console.info(this.especialidad)

    const prueba = {
      especialidad: this.especialidad,
      fechayhora: this.usuarioLogueado.disponibilidadEsp,
      disponible: true
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
