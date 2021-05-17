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
  ocultarBotonLogout: boolean = true;
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
        if(res && res.uid){
          this.usuario = this.authSvc.obtenerUsuarioLogueado(res.email);
          console.log(this.usuario);
          
          if(res.email === 'admin@admin.com' || this.usuario.admin){
            this.adminLogueado = true;
          }
          if(this.authSvc.isLogged == null){
            this.ocultarBotonesLogueo = false;
          }else{
            this.ocultarBotonesLogueo = true;
          }
        }
        else{
          this.adminLogueado = false;
        }
        
      });
  }

}
