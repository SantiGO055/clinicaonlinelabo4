import { Component, OnInit } from '@angular/core';
import { User } from '../clases/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public toggleNavbar = true;
  ocultarLogin: boolean = true;
  ocultarRegistro: boolean = false;
  ocultarBotonesLogueo: boolean = false;
  adminLogueado:boolean = false;
  usuarioLogueado: User = new User();
  usuario : User = new User();
  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    
    // console.log(this.authSvc.isLogged);
      this.authSvc.afAuth.authState.subscribe(res=>{
        this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if(this.usuarioLogueado != null){

          if(this.authSvc.isLogged == null){
            this.ocultarBotonesLogueo = false;
          }else{
            this.ocultarBotonesLogueo = true;
          }
          if(res && res.uid){
            this.ocultarBotonesLogueo = true;
            this.usuario = this.authSvc.obtenerUsuario(res.email);
            // console.log(this.usuario);
            
            if(this.usuario.admin){
              this.adminLogueado = true;
            }
            
          }
          else{
            this.adminLogueado = false;
            
          }
        }
        else{
          this.adminLogueado = false;
        }
        
      });
  }
  obtenerEventoBotonLogueo(ocultarBoton: boolean){
    // console.log("recibi boton deslogueo "+ ocultarBoton);
    this.ocultarBotonesLogueo = ocultarBoton;
  }

}
