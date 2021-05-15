import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  errorMessage = '';
  email: string ='';
  password: string = '';
  emailRegister: string ='';
  passwordRegister: string = '';
  flag: boolean = true;
  
  
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private authSvc: AuthService) { 

   }

   
  user: User = new User();

  
  ngOnInit(): void {
  }
  // if(this.router.routerState.snapshot.url == "/LoginComponent"){
  //   this.flag = !this.flag;
  // }
  async login(){
    
    this.user.email = this.email;
    try {
      const user = await this.authSvc.SignIn(this.user,this.password);
      // console.log(user);
      if (user.message == null ) {
        // console.log("se logueo");
        localStorage.setItem('emailLogueadoLocalStorage', this.user.email);
        // localStorage.setItem('usuarioLogueado', JSON.stringify(this.user));
        this.router.navigateByUrl('/');
      }
      else{
        if(user.code == 'auth/invalid-email'){
          window.alert("Ingrese un email valido por favor");
        }
        if(user.code == 'auth/argument-error'){
          window.alert("Complete la contraseña por favor.");
        }
        if(user.code == 'auth/wrong-password'){
          window.alert("Contraseña incorrecta, reingrese");
        }
        if(user.code == 'auth/user-not-found'){
          window.alert("Usuario inexistente");
        }
        // console.log(user.message);
      }
      
    } catch (error) {
      
      // console.log(error);
    }
  }
  completarCamposTest1(){
    this.email = "test1@test.com";
    this.password = "test123";

  }
  completarCamposTest2(){
    this.email = "test2@test.com";
    this.password = "test123";
  }
  completarCamposTest3(){
    this.email = "test3@test.com";
    this.password = "test123";
  }

}
