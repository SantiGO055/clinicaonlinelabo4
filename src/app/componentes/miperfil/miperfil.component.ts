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
  }
  seleccionDispo(){
    console.info(this.especialidad)

    const prueba = {
      descripcion: this.especialidad,
      disponibilidadEsp: this.usuarioLogueado.disponibilidadEsp
    };
    console.info(prueba);
    this.disp.push(JSON.parse(JSON.stringify(prueba)));
    

    this.usuarioLogueado.disponibilidadEsp = this.disp;
    // this.usuarioLogueado.disponibilidadEsp.slice(0,1)
    console.log(this.usuarioLogueado)
    this.fireSvc.updateUsuario(this.usuarioLogueado);

  }
  capturarSelectEspecialidad(value){
    this.especialidad = value.$ngOptionLabel;
    console.info()
  }

}
