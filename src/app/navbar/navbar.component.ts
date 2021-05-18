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
  ocultarBotonesLogueo: boolean;
  adminLogueado:boolean = false;
  usuario : User = new User();
  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    
    // console.log(this.authSvc.isLogged);
    
      this.authSvc.afAuth.authState.subscribe(res=>{
        if(this.authSvc.isLogged == null){
          
        }else{
          
        }
        if(res && res.uid){
          this.ocultarBotonesLogueo = true;
          this.usuario = this.authSvc.obtenerUsuarioLogueado(res.email);
          // console.log(this.usuario);
          
          if(this.usuario.admin){
            this.adminLogueado = true;
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
