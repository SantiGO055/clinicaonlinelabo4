import { Especialidad } from './../clases/especialidad';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public formCompleted: boolean = false;
  private dbpath = '/usuarios'; //nombre de la coleccion que creara para los documentos
  private dbpathEspecialidad = '/especialidades'; //nombre de la coleccion que creara para los documentos
  // private dbPathPuzzle = '/juegos-puzzle'; //nombre de la coleccion que creara para los documentos
  // private dbPathTateti = '/juegos-tateti'; //nombre de la coleccion que creara para los documentos
  // private dbPathPpt = '/juegos-ppt'; //nombre de la coleccion que creara para los documentos
  // private dbPathMemo = '/juegos-memotest'; //nombre de la coleccion que creara para los documentos
  // private dbPathEncuesta = '/encuesta'; //nombre de la coleccion que creara para los documentos
  usuariosCollection: AngularFirestoreCollection<User>;
  especialidadCollection: AngularFirestoreCollection<Especialidad>;
  // puzzleColecction: AngularFirestoreCollection<Estadisticapuzzle>;
  // tatetiCollection: AngularFirestoreCollection<Estadisticatateti>;
  // pptCollection: AngularFirestoreCollection<Estadisticappt>;
  // memoCollection: AngularFirestoreCollection<Estadisticamemotest>;
  // encuestaCollection: AngularFirestoreCollection<Encuesta>;



  usuariosDoc: AngularFirestoreDocument<User> | undefined;
  public usuarios: Observable<User[]>;
  public especialidades: Observable<Especialidad[]>;
  // public encuesta: Observable<Encuesta[]>;
  // public puzzleEstadistica: Observable<Estadisticapuzzle[]>;
  // public memoEstadistica: Observable<Estadisticamemotest[]>;
  // public tatetiEstadistica: Observable<Estadisticatateti[]>;
  // public pptEstadistica: Observable<Estadisticappt[]>;
  constructor(public db: AngularFirestore,
    private storage : AngularFireStorage) {
    
    // this.mensajes = db.collection<Mensaje>('mensajes').valueChanges();
    this.usuariosCollection = db.collection(this.dbpath);
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));

    this.especialidadCollection = db.collection(this.dbpathEspecialidad);
    this.especialidades = this.especialidadCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Especialidad;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    

   }

   public addFile(nombreArchivo: string, datos: any) {
    return this.storage.upload('fotosPerfil/'+nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref('fotosPerfil/' + nombreArchivo);
  }
  //gs://pruebaapp-d0854.appspot.com/images
  getAllFiles() {
    let asd = this.storage.ref('fotosPerfil/').listAll();
    return asd;
  }

   getAllUsers(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.usuarios;
   }
  //  getAll(): AngularFirestoreCollection<Mensaje>{
  //   return this.mensajesColecction;
  // }
  add(usuario: User){

    return this.usuariosCollection.add(JSON.parse( JSON.stringify(usuario)));
    // return this.mensajesColecction.add({...mensaje});
  }
  AddEspecialidades(especialidad: Especialidad){
    return this.especialidadCollection.add(JSON.parse( JSON.stringify(especialidad)));

  }
  getEspecialidades(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.especialidades;
   }
  // addTateti(estadisticaTateti: Estadisticatateti){
  //   return this.tatetiCollection.add(JSON.parse( JSON.stringify(estadisticaTateti)));
  // }
  // getMensajeFromEmail(email: string){
  //   return this.mensajesColecction.ref.get().then((doc)=>{
  //     if(!doc.empty){
  //       console.log(doc.docs[0].data());
  //     }
  //   });
  // }
  // addMemo(estadisticaMemo: Estadisticamemotest){
  //   return this.memoCollection.add(JSON.parse( JSON.stringify(estadisticaMemo)));
  // }
  // addEncuesta(encuesta: Encuesta){
  //   this.formCompleted = true;
  //   return this.encuestaCollection.add(JSON.parse( JSON.stringify(encuesta)));
  // }

  // getAllEncuesta(){
  //   return this.encuesta;
  // }
  
  deleteUser(usuario: User){
    this.usuariosDoc = this.db.doc(`mensajes/${usuario.uid}`);
    this.usuariosDoc.delete();
  }
  updateMensaje(usuario: User){
    
    this.usuariosDoc = this.db.doc(`mensajes/${usuario.uid}`);
    this.usuariosDoc.update(usuario);
  }
  // addEstadisticaPuzzle(estadisticaPuzzle: Estadisticapuzzle){

  //   console.log(estadisticaPuzzle);
  //   return this.puzzleColecction.add(JSON.parse( JSON.stringify(estadisticaPuzzle)));

  // }
  // addPPT(estadisticaPPT: Estadisticappt){
  //   return this.pptCollection.add(JSON.parse( JSON.stringify(estadisticaPPT)));
  // }
  // getEmail(user: User){

  //   this.mensajes.forEach(element => {
      
  //     console.log(element);
  //   });
  //   // this.mensajes
  //   // this.db.collection(this.dbpath).doc()
  //   // user.email
  // }
}
