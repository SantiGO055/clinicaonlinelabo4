import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  flag: boolean = false;
  email: string ='';
  password: string = '';
  radioEspecialidad: string = '';
  username: string = '';
  user: User = new User();
  fecha: Date = new Date();
  especialidades:Especialidad[];
  spinner:boolean = false;
  mostrarInputRadioOtro:boolean = false;
  tipo:string = 'Seleccione tipo de alta';
  downloadURLFoto1: Observable<string>;
  downloadURLFoto2: Observable<string>;
  file;
  mensajeArchivo: string;
  nombreArchivo: string;
  mensajeArchivo2: string;
  nombreArchivo2: string;
  porcentaje:number = 0;
  urlLocal:string;
  mensajeSubida:string = "";
  finalizado:boolean = false;
  archivo1;
  subirArchivos:boolean = false;
  
  public formGroup!: FormGroup;
  constructor(private authSvc : AuthService, 
    private router: Router,
    private fireSvc: FirebaseService,
    private fb:FormBuilder,
    private storage: AngularFireStorage,
    ) { }

    
    

  ngOnInit(): void {
    this.fireSvc.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
      this.spinner = true;
      this.especialidades = especialidad;
    });
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',Validators.required],
      'tipo': ['',Validators.required],
      'edad': ['',Validators.required],
      'dni': ['',Validators.required],
      'obraSocial': ['',Validators.required],
      'email': ['',Validators.required],
      'password': ['',Validators.required],
      'confirmarPassword': ['',Validators.required],
      'fotoPerfil': ['',Validators.required],
      'especialidad': ['',Validators.required],
      'especialidadInput': ['',Validators.required],
      'fileSource': ['', [Validators.required]],
      'fileSource2': ['', [Validators.required]]
      // 'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      // 'telefono': ['',[Validators.required,Validators.min(1111111111),Validators.max(9999999999)]],
      // 'ppt': ['',],
      // 'memotest': ['',],
      // 'tateti': ['',],
      // 'rompecabezas': ['',],
      // 'ninguno': ['',],
      // 'cambios': ['',],
      // 'recomienda': ['',],
      // 'nacionalidad':[{value: '', disabled: true}],
      // 'email': ['',[Validators.required,Validators.email]],'confirmarClave': ['',Validators.required],
    },
    { 
      validator: this.chequearClave('password', 'confirmarPassword')
    });
  }
  private chequearArchivos(control: AbstractControl):null | object {
    console.log(control);
    
    if(this.subirArchivos){
      return {
        habilitado: true
      }
    }
    else{
      return null;
    }
  }
  onFileSelectedFoto(event,multiple) {
    const filelist = event.target.files;
    
    if(multiple){
      if(filelist.length > 2){
        console.log("seleccionar solo 2 archivos");
        this.subirArchivos = false;
        this.mensajeSubida = "Seleccionar solo 2 archivos";
      }
      else{
        this.subirArchivos = true;

        const file = filelist[0];
        const file2 = filelist[1];
        console.log(file);
        
        this.formGroup.patchValue({
          fileSource: file
        });
        this.formGroup.patchValue({
          fileSource2: file2
        });
        console.log(filelist[0].name);
        console.log(filelist[1].name);
        this.mensajeArchivo = `Archivo preparado: ${filelist[0].name}`;
        this.mensajeArchivo2 = `Archivo preparado: ${filelist[0].name}`;
        this.nombreArchivo = this.user.obtenerFechaHora() + filelist[0].name;
        this.nombreArchivo2 = this.user.obtenerFechaHora() + filelist[1].name;

      }

    }
    
  }
  subirFoto(){
    
    const archivo1 = this.formGroup.get('fileSource').value;
    let referencia = this.fireSvc.referenciaCloudStorage(this.nombreArchivo);
    // console.log(archivo1);
    let tarea = this.fireSvc.addFile(this.nombreArchivo,archivo1).snapshotChanges().pipe(finalize(()=>{
      console.log("llegue");
      const archivo2 = this.formGroup.get('fileSource2').value;
      let referenciaArchivo2 = this.fireSvc.referenciaCloudStorage(this.nombreArchivo2);
      this.fireSvc.addFile(this.nombreArchivo2, archivo2).snapshotChanges().pipe(finalize(() => {
      referenciaArchivo2.getDownloadURL().subscribe(url => {
        this.downloadURLFoto2 = url;
        console.log(this.downloadURLFoto2);

        // this.fireSvc.add
      });

    })).subscribe();

      referencia.getDownloadURL().subscribe(url=>{
        this.downloadURLFoto1 = url;
        console.log(this.downloadURLFoto1);

        // this.fireSvc.add
        
      });
      
    })).subscribe();
    // this.fireSvc.addFile(this.nombreArchivo, archivo1);
    
  }
  chequearClave(controlName: string, matchingControlName: string): null | object{
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
  capturarSelectTipo(){
    this.tipo = this.tipo;
  }
  capturarRadioEspecialidad(){
    // this.formGroup.get('especialidad').value;
    this.radioEspecialidad = this.formGroup.get('especialidad').value;;
    console.log(this.radioEspecialidad);
    if(this.radioEspecialidad === "Otra"){
      this.mostrarInputRadioOtro = true;
    }
    else{

      this.mostrarInputRadioOtro = false;
    }
  }
  prueba(){
    console.log(this.formGroup.getRawValue());
    
    // if(this.formGroup.get("fotoPerfil2").value != ""){
    //   console.log("llegue");
    //   this.subirFoto2();
    //   this.subirFoto();

    // }
    // else{
      this.subirFoto();

    // }
  }
  async register(){
    this.user.email = this.email;
    this.user.username = this.username;
    this.user.fecha = this.user.obtenerFechaHora();
    // this.user.password = this.password;
    const user = await this.authSvc.register(this.user,this.password);
    if(user.message == null){
      // this.alertaLogueo('Se creo el usuario con email: ' + this.user.email + ' correctamente', 'Registro exitoso');
      console.log("Successfully created user!");
      this.user.uid = user.user.uid;
      this.user.fecha = this.user.obtenerFechaHora();
      // this.authSvc.SignIn(this.user,this.password);
      let asd = this.fireSvc.add(this.user);
      this.router.navigateByUrl('/home');
    }
    else{
      console.log(user.code);
      if(user.code == 'auth/invalid-email'){
        window.alert("Ingrese un email valido por favor");
      }
      if(user.code == 'auth/weak-password'){
        window.alert("La contraseña debe ser mayor a 6 caracteres.");
      }
      if(user.code == 'auth/wrong-password'){
        window.alert("Contraseña incorrecta, reingrese");
      }
      if(user.code == 'auth/email-already-in-use'){
        window.alert("Email en uso");
      }
      
    }
  }

}
