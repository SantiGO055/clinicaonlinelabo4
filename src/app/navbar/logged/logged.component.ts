import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  ocultarLogin: boolean = false;
  ocultarRegistro: boolean = false;
  ocultarMensaje : boolean = true;
  ocultarBotonLogout : boolean = true;
  logueado: boolean = false;
  
  @Input() usuario : any;
  usuarioLogueado: User;
  constructor(private authSvc : AuthService, private router: Router) { }
  ngOnInit(): void {
    
    this.authSvc.afAuth.authState.subscribe(res=>{
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
      console.log(res);
      console.log(this.usuarioLogueado);
      if(res && res.uid){
        // console.log(res);
        //TODO verificar por que no muestra estado logueado
        if(this.usuarioLogueado.admin){
          // console.log(res)

          this.logueado = true;
          this.usuario.email = res.email;
          this.ocultarMensaje = true;
        }
        if(res.emailVerified && this.usuarioLogueado.aprobadoPorAdmin){
          // console.log(res)

          this.logueado = true;
          this.usuario.email = res.email;
          this.ocultarMensaje = true;
        }
      }
      else{
        this.logueado = false;
        this.ocultarMensaje = false;
      }
    });
    // console.log(this.authSvc.isLogged);
    // console.log(this.authSvc.isLogged.aprobadoPorAdmin);
 
}
async desloguear(){
  // this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
  this.ocultarMensaje = false;
  if(this.usuario.email = this.usuarioLogueado.email){
        this.authSvc.afAuth.signOut();
        this.ocultarBotonLogout = false;
        sessionStorage.clear();
        localStorage.removeItem("usuarioLogueado");
        this.router.navigate(["/ingreso/login"]);
        this.logueado = false;
      }
      else{
        this.ocultarBotonLogout = true;
        this.logueado = true;
      }

  }

}
