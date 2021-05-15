import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  logueado : boolean = false;
  constructor(public afAuth: AngularFireAuth,private router: Router) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
   }

  //login

  async SignIn(user: User,password:string) {
    
    // console.log(user);
    try {
      this.isLogged = user;
      return await this.afAuth.signInWithEmailAndPassword(user.email, password);
    } 
    catch(error){
      return error;
    }
  }
  async register(user: User,password:string) {
    try {
      var aux = this.afAuth.createUserWithEmailAndPassword(user.email,password);
      (await aux).user?.updateProfile({
        displayName: user.username
      })
      return await aux;
    } catch (error) {
      console.log('Error on register user', error);
      return error;
    }
  }
  obtenerUsuarioLogueado(){
   
    return this.afAuth.authState;
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
