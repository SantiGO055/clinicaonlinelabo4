import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lessThanValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuariosAAprobar: User[];
  usuariosEspecialistas: User[];
  spinner: boolean = true;
  habilitado: boolean;
  mostrarListado: boolean = false;
  mensajeDeshabilitado:string = 'Habilitar';
  mensajeHabilitado:string= 'Deshabilitar';
  mensaje = 'Listado de especialistas pendientes de aprobación';
  checked:boolean = false;
  constructor(
    private authSvc: AuthService,
    private fireSvc: FirebaseService,
    private fb:FormBuilder,
  ) { 
    this.usuariosAAprobar = [];
    this.usuariosEspecialistas = [];
  }
  public formGroupCheck!: FormGroup;



  ngOnInit(): void {
    this.fireSvc.getAllUsers().subscribe((usuarios)=>{
      
      this.usuariosEspecialistas = [];
      usuarios.forEach(usuario => {
        // console.log(usuario);
        // this.spinner = false;
        
        this.mensaje = 'Listado de especialistas pendientes de aprobación';
        if(usuario.especialista){
          this.usuariosEspecialistas.push(JSON.parse(JSON.stringify(usuario)));
          if(!usuario.aprobadoPorAdmin){
            

            this.habilitado=false;
            this.mensajeHabilitado = "Deshabilitar";
            this.mensajeDeshabilitado = "Habilitar";
            this.mostrarListado = true;
            // console.log("este usuario no esta aprobado por admin "+usuario.email)
            this.spinner = false;
            
  
            // this.usuariosAAprobar.push(JSON.parse(JSON.stringify(usuario)));
  
          }
          else{
            this.habilitado = true;
            this.mensajeHabilitado = "Deshabilitar";
            this.mensajeDeshabilitado = "Habilitar";
            if(!this.mostrarListado){
  
              this.mensaje = 'No se encontraron usuarios para aprobar'
            }
            this.spinner = false;
  
          }
        }
      });
    });

    this.formGroupCheck = this.fb.group({
      'check': ['',[Validators.required]]});
  }
  verificarChangeCheck(
    usuario: User,
    event
    // usuario: User,index: number
    ){
      // console.log(event.target.checked);
      usuario.aprobadoPorAdmin = event.target.checked;
      this.habilitar(usuario,0)
    // this.habilitar(usuario,index);
  }
  habilitar(usuario:User,index:number){
    
    this.spinner = true;
    this.usuariosAAprobar = [];
    // this.habilitado = true;
    // console.log(index);

    // if(usuario.aprobadoPorAdmin){
    //   this.habilitado = false;
    //   usuario.aprobadoPorAdmin = false;
    //   this.mensajeDeshabilitado = "Deshabilitar";
    // }
    // else{
    //   this.habilitado = true;

    //   usuario.aprobadoPorAdmin = true;
    //   this.mensajeHabilitado = "Habilitar";

    // }
    
    this.fireSvc.updateUsuario(usuario).then(()=>{
      // this.usuarios.splice(index,1);
      
      this.spinner = false;
      // console.log(this.usuariosAAprobar);
      if(this.usuariosAAprobar.length == 0){
        this.mostrarListado = false;
        
      }
      
    });

  }
  deshabilitar(usuario:User,index:number){
    this.spinner = true;
    this.usuariosAAprobar = [];
    this.habilitado = false;
    usuario.aprobadoPorAdmin = false;
    if(!usuario.aprobadoPorAdmin){
      this.mensajeHabilitado = "Habilitar";
    }
    this.fireSvc.updateUsuario(usuario).then(()=>{
      // this.usuarios.splice(index,1);
      this.spinner = false;
      // console.log(this.usuariosAAprobar);
      if(this.usuariosAAprobar.length == 0){
        this.mostrarListado = false;
        
      }
      
    });
  }

}
