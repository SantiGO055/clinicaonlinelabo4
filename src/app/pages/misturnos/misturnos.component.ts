import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {
  usuario: User = new User();

  pacienteLogueado:boolean = false;
  adminLogueado:boolean = false;
  especialistaLogueado:boolean = false;
  public formGroup!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private fb:FormBuilder,

  ) { }

  ngOnInit(): void {
        this.authSvc.afAuth.authState.subscribe(res=>{
        if(this.authSvc.isLogged == null){
          console.log("sin loguear");
        }else{
          
        }
        if(res && res.uid){
          // this.ocultarBotonesLogueo = true;
          this.usuario = this.authSvc.obtenerUsuario(res.email);
          // console.log(this.usuario);
          
          if(this.usuario.admin){
            this.adminLogueado = true;
            this.especialistaLogueado = false;
            this.pacienteLogueado = false;


          }
          if(this.usuario.especialista){
            this.adminLogueado = false;
            this.especialistaLogueado = true;
            this.pacienteLogueado = false;
          }
          if(this.usuario.paciente){
            this.adminLogueado = false;
            this.especialistaLogueado = false;
            this.pacienteLogueado = true;
          }
        
        }
        else{
          
        }
        
      });

      this.formGroup = this.fb.group({
        'nombre': ['',[Validators.required]],
        'apellido': ['',Validators.required],
        // 'tipo': ['',Validators.required],
        'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
        'dni': ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
        'obraSocial': ['',[Validators.required]],
        'descripcion': [false],
        'descrArr': this.fb.array([]),
        
      });
  }

  solicitarTurno(){

  }

  prueba(){
    console.log(this.formGroup.getRawValue());
  }

}
