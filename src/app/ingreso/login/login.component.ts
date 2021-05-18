import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  flag: boolean = false;
  
  
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private authSvc: AuthService,
   private spinner: NgxSpinnerService) { 

   }

   
  user: User = new User();

  
  ngOnInit(): void {
  }
  // if(this.router.routerState.snapshot.url == "/LoginComponent"){
  //   this.flag = !this.flag;
  // }
  async login(){
    this.spinner.show();
    

    this.user.email = this.email;
    try {
      //verificar si el usuario esta habilitado o no
      
      await this.authSvc.SignIn(this.user,this.password).then((res)=>{
        this.spinner.hide();
        this.flag = false;
      });
      // console.log(user);

      // if (user.user.message == null ) {
      //   localStorage.setItem('emailLogueadoLocalStorage', this.user.email);
        
      //   console.log(user);
      //   // this.authSvc.verificarSiAdminAprobo()
      //   // localStorage.setItem('usuarioLogueado', JSON.stringify(this.user));
      //   // this.router.navigate(['/grhthrth']);
      // }
      // else{
      //   if(user.code == 'auth/invalid-email'){
      //     window.alert("Ingrese un email valido por favor");
      //   }
      //   if(user.code == 'auth/argument-error'){
      //     window.alert("Complete la contraseña por favor.");
      //   }
      //   if(user.code == 'auth/wrong-password'){
      //     window.alert("Contraseña incorrecta, reingrese");
      //   }
      //   if(user.code == 'auth/user-not-found'){
      //     window.alert("Usuario inexistente");
      //   }
      //   // console.log(user.message);
      // }
      
    } catch (error) {
      
      // console.log(error);
    }
  }
  completarCamposAdmin(){
    this.email = "admin@admin.com";
    this.password = "admin123";

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
