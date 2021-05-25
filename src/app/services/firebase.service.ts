import { Especialidad } from './../clases/especialidad';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../clases/user';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Turnos } from '../clases/turnos';
import { Baja } from '../clases/baja';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public formCompleted: boolean = false;
  private dbpath = '/usuarios';
  private dbpathEspecialidad = '/especialidades';
  private dbpathTurno = '/turnos';
  private dbPathBajas = '/bajas';
  // private dbPathPuzzle = '/juegos-puzzle';
  // private dbPathTateti = '/juegos-tateti';
  // private dbPathPpt = '/juegos-ppt';
  // private dbPathMemo = '/juegos-memotest';
  // private dbPathEncuesta = '/encuesta';
  usuariosCollection: AngularFirestoreCollection<User>;
  especialidadCollection: AngularFirestoreCollection<Especialidad>;
  turnosCollection: AngularFirestoreCollection<Turnos>;
  bajasCollection: AngularFirestoreCollection<Baja>;
  // puzzleColecction: AngularFirestoreCollection<Estadisticapuzzle>;
  // tatetiCollection: AngularFirestoreCollection<Estadisticatateti>;
  // pptCollection: AngularFirestoreCollection<Estadisticappt>;
  // memoCollection: AngularFirestoreCollection<Estadisticamemotest>;
  // encuestaCollection: AngularFirestoreCollection<Encuesta>;



  usuariosDoc: AngularFirestoreDocument<User> | undefined;
  public usuarios: Observable<User[]>;
  public especialidades: Observable<Especialidad[]>;
  public turnos: Observable<Turnos[]>;
  public bajas: Observable<Baja[]>;
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


    this.turnosCollection = db.collection(this.dbpathTurno);
    this.turnos = this.turnosCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Turnos;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.bajasCollection = db.collection(this.dbPathBajas);
    this.bajas = this.bajasCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Baja;
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
  addUser(usuario: User){

    return this.usuariosCollection.add(JSON.parse( JSON.stringify(usuario)));
    // return this.mensajesColecction.add({...mensaje});
  }
  AddEspecialidades(especialidad: Especialidad){
    return this.especialidadCollection.add(JSON.parse( JSON.stringify(especialidad)));

  }
  getEspecialidades(){
    return this.especialidades;
   }
  

   /** Bajas */
   /** Antes de dar la baja modificar y poner baja: true */
  addBaja(baja: Baja,usuario: User){
    this.updateUsuario(usuario);
    return this.bajasCollection.add(JSON.parse( JSON.stringify(baja)));

  }
  getBajas(){
    return this.bajas;
   }

   /** Usuarios */
  deleteUser(usuario: User){
    this.usuariosDoc = this.db.doc(`mensajes/${usuario.uid}`);
    this.usuariosDoc.delete();
  }
  updateUsuario(usuario: User){
    this.usuariosDoc = this.db.doc(`usuarios/${usuario.uid}`);
    return this.usuariosDoc.update(usuario);
  }

  /*** Turnos */
  getAllTurnos(){
    //  return this.db.collection(this.dbpath).snapshotChanges();
    return this.turnos;
   }
  addTurno(turno: Turnos){

    return this.turnosCollection.add(JSON.parse( JSON.stringify(turno)));
  // return this.mensajesColecction.add({...mensaje});
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
