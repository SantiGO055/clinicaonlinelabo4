import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FirebaseService } from 'src/app/services/firebase.service';
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
  // userEsp1: User = new User();
  // userEsp2: User = new User();
  // userPac1: User = new User();
  // userPac2: User = new User();
  userAdm: User = new User();
  userAux: User[] = [];
  spinnerChico: boolean = true;
  
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private authSvc: AuthService,
   private spinner: NgxSpinnerService,
   private fireSvc: FirebaseService) { 

   }

   
  user: User = new User();

  ngOnInit(): void {
    this.fireSvc.getAllUsers().subscribe((usr)=>{
      sessionStorage.clear();
      this.spinnerChico = false;
      this.userAux = usr;
    });
  }
  capturarHardcodeo(usuario: User){
    this.email = usuario.email;
    this.password = usuario.password;
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
