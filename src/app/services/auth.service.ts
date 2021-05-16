import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { AlertasService } from './alertas.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any;
  public usuarios: User[] = [];
  logueado : boolean = false;
  public logueadoObs: Observable<User>;
  constructor(public afAuth: AngularFireAuth,private router: Router,
    private alertas: AlertasService,
    private fireSvc: FirebaseService) {
      this.fireSvc.getAllUsers().subscribe((users=>{
        this.usuarios = users;
        afAuth.authState.subscribe(user => {
          this.usuarios.forEach(userAux => {
            // console.log(user)
            // console.log(userAux)
            if(userAux.email == user.email){
              this.isLogged = userAux;
              // console.log(this.isLogged);
  
            }
          });
        });
      }));
      
   }

  //login
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(['ingreso/login']);
  }
  verificarSiAdminAprobo(usuario : User){
    let retorno = false;
    this.usuarios.forEach(user => {

      if( usuario.email = user.email){
        if(usuario.aprobadoPorAdmin == false){

          retorno = false;
        }
        else{
          retorno = true;
        }
      }
      
      
      
    });
    return retorno;

  }

  verificarUsuarioALoguearEspecialista(email:string){
    let retorno = false;
    this.usuarios.forEach(usuario => {
        if(usuario.email === email){
          
            if(usuario.especialista){
              retorno = true;
            }
            else{
              retorno = false;
            }

          
        }
    });
    return retorno;
  }
  verificarAprobacion(result:any,user:User){
    if(!result.user.emailVerified){
      //si no esta verificado veo si es admin pasa de una
      if(user.admin == true){
        localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));

        this.router.navigate(['/']);
        
      }
      //si no es admin muestro alerta de que no esta verificado
      else{
        this.alertas.mostrarAlertaConfirmacionEmail('Email sin verificar','Verificación','Verifique su casilla de mail para verificar la cuenta').then(()=>{
          if(this.alertas.reenvioEmail){

            this.sendEmailVerification();
          }
          else{
            this.router.navigate(['ingreso/login']);

          }
          
        });
      }
      console.log("sinverificar");
      // this.alertas.mostrarAlertaConfirmacionEmail('Email sin verificar','Verificación','Email enviado correctamente')
    }
    else{
      
      //si esta verificado y el perfil es especialista
      if(this.verificarUsuarioALoguearEspecialista(result.user.email)){
        //si es especialista verifico si admin lo aprobo
          if(!this.verificarSiAdminAprobo(user)){
            this.alertas.mostraAlertaSimple('Un administrador debe verificar su usuario','Verificación');
            this.isLogged = null;
          }
          else{
            console.log(this.isLogged);
            localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));

            this.router.navigate(['/']);
          }

        }
        else{
          localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));

          //si esta verificado y no es especialista
          this.router.navigate(['/']);
        }

      
      
    }
  }
  async SignIn(user: User,password:string) {
    
    // console.log(user);
    try {
      
      user = this.obtenerUsuarioLogueado(user.email);
        this.isLogged = user;
        
          
          await this.afAuth.signInWithEmailAndPassword(user.email, password).then((result)=>{
            // user = this.obtenerUsuarioLogueado(user.email);
            // this.isLogged = user;
            // console.log(user);
            localStorage.setItem('usuarioLogueado',JSON.stringify(this.isLogged));
    
            this.verificarAprobacion(result,user);
            
            return result;
          });
        
    } 
    catch(error){
      this.alertas.mostraAlertaSimple(error,'Error');
      return error;
    }
  }
  async register(user: User,password:string) {
    try {
      var aux = this.afAuth.createUserWithEmailAndPassword(user.email,password).then(()=>{
        this.SignIn(user,password);
        this.sendEmailVerification();
      });
      return aux;
      // (await aux).user?.updateProfile({
      //   displayName: user.username
      // })
      // return await aux;
    } catch (error) {
      this.alertas.mostraAlertaSimple('Error: '+error,'Error');
      console.log('Error on register user', error);
      return error;
    }
  }
  obtenerUsuarioLogueado(email: string){
    let userAux: User = new User();

      this.usuarios.forEach(user => {
        if(user.email === email){
          userAux = user;
          
        }
      });
      // console.log(userAux);
    return userAux;
  }
  obtenerPruebaUsuario(){
    var auxUser: User = new User();
    this.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        
        auxUser.email = <string>res.email;
        auxUser.uid = res.uid;
        auxUser.username = <string>res.displayName;
        console.log(auxUser);
      }
    });
    return auxUser;
  }
  ChequearLogueado(){
    this.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.logueado = true;
      }
      else{
        this.logueado = false;
      }
    });
    return this.logueado;
  }
}
