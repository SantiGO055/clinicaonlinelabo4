import { Component, OnInit } from '@angular/core';
import { User } from '../clases/user';

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
  usuario : User = new User();
  constructor() { }

  ngOnInit(): void {
    if(this.usuario.email = localStorage.getItem('emailLogueadoLocalStorage')){
      this.ocultarLogin = false;
    }
  }

}
