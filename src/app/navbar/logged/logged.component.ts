import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  localStorageUsername!: string;
  constructor(private authSvc : AuthService, private router: Router) { }
  ngOnInit(): void {
    
    this.authSvc.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.logueado = true;
        this.usuario.email = res.email;
        this.ocultarMensaje = false;
      }
      else{
        this.logueado = false;
        this.ocultarMensaje = true;
      }
    });
 
}
async desloguear(){
  this.localStorageUsername = localStorage.getItem('emailLogueadoLocalStorage');
  if(this.usuario.email = this.localStorageUsername){
        this.authSvc.afAuth.signOut();
        this.ocultarBotonLogout = false;
        localStorage.removeItem("currentUser");
        this.router.navigate(["/ingreso/login"]);
        this.logueado = false;
      }
      else{
        this.ocultarBotonLogout = true;
        this.logueado = true;
      }

  }

}
