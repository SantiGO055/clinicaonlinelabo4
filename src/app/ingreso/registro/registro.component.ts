import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import Swal from'sweetalert2';

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
  spinner:boolean = true;
  mostrarInputRadioOtro:boolean = false;
  tipo:string = 'Seleccione tipo de alta';
  downloadURLFoto1: string;
  downloadURLFoto2: string;
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
  seLogueoAdmin:boolean = false;
  adminLogueado:User = new User();
  tarea: any;
  referencia: AngularFireStorageReference;
  checkArray = [];
  especialidadCheck:any;
  public formGroup!: FormGroup;
  constructor(private authSvc : AuthService, 
    private router: Router,
    private fireSvc: FirebaseService,
    private fb:FormBuilder,
    private storage: AngularFireStorage,
    ) { }

    
    

  ngOnInit(): void {
    this.fireSvc.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
      this.spinner = false;
      this.especialidades = especialidad;
    });


    
    this.authSvc.afAuth.authState.subscribe(res=>{
      // console.log(res);
      // console.log(this.authSvc.isLogged);
      if(this.authSvc.isLogged != null){
        if(this.authSvc.isLogged.admin){
          this.adminLogueado = this.authSvc.isLogged;
          this.seLogueoAdmin = true;
          this.tipo = 'administrador';
        }
        else{
          // console.log("admin sin loguear");
          this.seLogueoAdmin = false;
  
        }
      }
      else{
        // console.log("sin loguear");
        
      }
    });
    
    this.formGroup = this.fb.group({
      'nombre': ['',[Validators.required]],
      'apellido': ['',Validators.required],
      'tipo': ['',Validators.required],
      'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni': ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
      'obraSocial': ['',[Validators.required]],
      'descripcion': [false],
      'descrArr': this.fb.array([]),
      
      'email': ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'password': ['',Validators.required],
      'confirmarPassword': ['',Validators.required],
      'fotoPerfil': ['',Validators.required],
      'especialidad': ['',],
      'especialidadInput': ['',],
      'fileSource': ['', ],
      'fileSource2': ['', ]
      
    },
    { 
      validator: this.chequearClave('password', 'confirmarPassword')
    });
  }
  private chequearArchivos(control: AbstractControl):null | object {
    // console.log(control);
    
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
        // console.log("seleccionar solo 2 archivos");
        this.subirArchivos = false;
        this.mensajeSubida = "Seleccionar solo 2 archivos";
      }
      else{
        if(filelist[0] != null ){
          // console.log("archivo 1?");

          this.subirArchivos = true;
          const file = filelist[0];
          this.formGroup.patchValue({
            fileSource: file
          });
          
          
          this.mensajeArchivo = `Archivo preparado: ${filelist[0].name}`;
          this.nombreArchivo = this.user.obtenerFechaHora() + " " + filelist[0].name;
          // console.log(this.mensajeArchivo);
          // console.log(this.nombreArchivo);

        }
        if(filelist[1] != null){
          // console.log("archivo 2?");
          const file2 = filelist[1];
          
          this.formGroup.patchValue({
            fileSource2: file2
          });
          this.mensajeArchivo2 = `Archivo preparado: ${filelist[1].name}`;
          this.nombreArchivo2 = this.user.obtenerFechaHora() + " " + filelist[1].name;


        }

      }

    }
    else{
      // console.log("llegue");
      if(filelist[0] != null){
        this.subirArchivos = true;
        const file = filelist[0];
        this.formGroup.patchValue({
          fileSource: file
        });
        this.mensajeArchivo = `Archivo preparado: ${filelist[0].name}`;
        this.nombreArchivo2 = this.user.obtenerFechaHora() + " " + filelist[0].name;

      }

    }
    
  }
  async subirFoto(){
    
    const archivo1 = this.formGroup.get('fileSource').value;
    this.referencia = this.fireSvc.referenciaCloudStorage(this.nombreArchivo);
    // console.log(archivo1);
    // console.log(this.formGroup.get('fileSource').value);
    // console.log(this.formGroup.get('fileSource2'));


    /** subo archivo 1 */
    return this.fireSvc.addFile(this.nombreArchivo, archivo1).snapshotChanges().pipe(finalize(() => {

      /** subo archivo 2 */
      if (this.formGroup.get('fileSource2').value != "") {
        // console.log(this.formGroup.get('fileSource2').value);
        const archivo2 = this.formGroup.get('fileSource2').value;
        let referenciaArchivo2 = this.fireSvc.referenciaCloudStorage(this.nombreArchivo2);
        this.fireSvc.addFile(this.nombreArchivo2, archivo2).snapshotChanges().pipe(finalize(() => {
          referenciaArchivo2.getDownloadURL().subscribe(url => {
            this.downloadURLFoto2 = url;
            // console.log(this.downloadURLFoto2);
            this.user.fotoPerfilDos = this.downloadURLFoto2;

            // this.fireSvc.add
          });
          this.referencia.getDownloadURL().subscribe(url => {
            this.downloadURLFoto1 = url;
            this.user.fotoPerfil = this.downloadURLFoto1;
      
            // console.log(this.downloadURLFoto1);
            this.fireSvc.addUser(this.user);
          });

        })).subscribe();

      }
      else{
        this.referencia.getDownloadURL().subscribe(url => {
          this.downloadURLFoto1 = url;
          this.user.fotoPerfil = this.downloadURLFoto1;
          if(this.user.email === 'admin@admin.com'){
            this.user.aprobadoPorAdmin = true;
          }
          this.user.aprobadoPorAdmin = false;
          // console.log(this.downloadURLFoto1);
          this.fireSvc.addUser(this.user);
        });

      }

      
        // this.fireSvc.add
    })).subscribe();
    // this.fireSvc.addFile(this.nombreArchivo, archivo1);
    
  }
  
  async register(){

    console.log(this.formGroup);
    
    
    // console.log(this.formGroup);
    this.user.nombre = this.formGroup.get('nombre').value;
    this.user.apellido = this.formGroup.get('apellido').value;
    this.user.edad = this.formGroup.get('edad').value;
    this.user.dni = this.formGroup.get('dni').value;
    this.user.email = this.formGroup.get('email').value;

    this.password = this.formGroup.get('password').value;
    this.user.fecha = this.user.obtenerFechaHora();
    

    
    if(this.tipo === "paciente"){
      
      this.user.descripcion = this.formGroup.get('descripcion').value;
      this.user.especialista = false;
      
      
      if(this.downloadURLFoto2 != ""){
        this.user.fotoPerfilDos = this.downloadURLFoto2;
      }
    }
    else if(this.tipo === "especialista"){
      this.user.especialista = true;
      this.formGroup.get('obraSocial').setErrors(null);
      
      

      let espAux = new Especialidad();
      if(this.formGroup.get('especialidadInput').value != ""){
        // espAux.nombre = this.formGroup.get('especialidadInput').value;
        // this.user.descripcion = espAux.nombre;
        
      }
      else{
        
        this.user.descripcion = JSON.parse(JSON.stringify(this.checkArray))
        
        // this.user.descripcion = this.formGroup.get('especialidad').value;

      }
    }
    else if(this.tipo === 'administrador'){
      this.user.admin = true;
      this.user.aprobadoPorAdmin = true;
      

    }
    await this.authSvc.register(this.user,this.password).then((result)=>{
      // console.log(result);
      this.subirFoto().then(()=>{
        // console.log("prueba");
      });
    });
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
    // 'nombre': ['',[Validators.required]],
    // 'apellido': ['',Validators.required],
    // 'tipo': ['',Validators.required],
    // 'edad': ['',[Validators.required,Validators.min(18),Validators.max(99)]],
    // 'dni': ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
    // 'descripcion': ['',Validators.required],
    // 'email': ['',Validators.required],
    // 'password': ['',Validators.required],
    // 'confirmarPassword': ['',Validators.required],
    // 'fotoPerfil': ['',Validators.required],
    // 'especialidad': ['',],
    // 'especialidadInput': ['',],
    // 'fileSource': ['', ],
    // 'fileSource2': ['', ]
    
    this.tipo = this.tipo;
    // if()
    // this.formGroup.reset();
    // this.formGroup.get('nombre').setValue('');
    // this.formGroup.get('apellido').setValue('');
    // this.formGroup.get('edad').setValue('');
    // this.formGroup.get('dni').setValue('');
    // // this.formGroup.get('descripcion').setValue('');
    // this.formGroup.get('email').setValue('');
    // this.formGroup.get('password').setValue('');
    // this.formGroup.get('confirmarPassword').setValue('');
    // this.formGroup.get('fotoPerfil').setValue('');
    // this.formGroup.get('especialidad').setValue('');
    // this.formGroup.get('especialidadInput').setValue('');
  }
  mostrarAgregarEspecialidad(){
    this.mostrarInputRadioOtro= !this.mostrarInputRadioOtro;
  }
  agregarEspecialidad(){
    let espAux = new Especialidad();
    espAux.nombre = this.formGroup.get('especialidadInput').value
    this.fireSvc.AddEspecialidades(espAux);
    
  }
  capturarRadioEspecialidad(event){
    // const isArray: FormArray = this.formGroup.get('descripcion') as FormArray;

    // console.log(event);
    // const formArray: FormArray = this.formGroup.get('descripcion') as FormArray;
    // console.log(formArray);
    // if(event.target.checked){
    //   // Add a new control in the arrayForm
    //   formArray.push(new FormControl(event.target.value));
    // }
    
    // console.log(e);
    // this.formGroup.get('especialidad').value;
    // const checkArray: FormArray = this.formGroup.get('checkArray') as FormArray;
    // console.log(checkArray);
    
    if(event.target.value === "Otra"){
      this.checkArray.forEach((check)=>{
        check = false;
      });
    }
    if(event.target.checked){
      this.checkArray.push(event.target.value);
      this.formGroup.get('especialidad').setValue(JSON.parse(JSON.stringify(this.checkArray)));
    } else {
      let i: number = 0;
      this.checkArray.forEach((item) => {
        console.log(item)
        console.log(event.target.value)
        if (item == event.target.value) {
          this.checkArray.splice(i);
          return;
        }
        if(event.target.value === "Otra"){
          event.target.value = false;
          console.log(this.formGroup.get('descripcion').value);
          this.checkArray.splice(i);
        }
        i++;
      });
    }
    // console.log(event.target.value)
    console.log(this.checkArray);
    // if (event.target.checked) {
    //   checkArray.push(new FormControl(event.target.value));
    // } else {
    //   let i: number = 0;
    //   checkArray.controls.forEach((item: FormControl) => {
    //     if (item.value == event.target.value) {
    //       checkArray.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });
    // }
    // console.log(checkArray);

    // this.radioEspecialidad = this.formGroup.get('descripcion').value;
    // console.log(this.radioEspecialidad);
    // console.log(event);
    // // console.log(this.radioEspecialidad);
    // if(this.radioEspecialidad === "Otra"){
    //   this.mostrarInputRadioOtro = true;
    // }
    // else{

    //   this.mostrarInputRadioOtro = false;
    // }
  }
  onCheckChange(e){
    console.log(e);
  }
  prueba(){
    // console.log(this.formGroup.get('descripcion'));
    this.formGroup.get('obraSocial').setErrors(null);
    console.log(this.formGroup);
    // console.log(this.tipo);
    
    // if(this.formGroup.get("fotoPerfil2").value != ""){
    //   console.log("llegue");
    //   this.subirFoto2();
    //   this.subirFoto();

    // }
    // else{
    // }

  }
  prueba2(){
    this.formGroup.get('nombre').setValue('Pruebaa');
    this.formGroup.get('apellido').setValue('Pruebita');
    this.formGroup.get('edad').setValue('29');
    this.formGroup.get('dni').setValue('12123456');
    // this.formGroup.get('descripcion').setValue('');
    this.formGroup.get('email').setValue('asdqweert4356@hotmail.com');
    this.formGroup.get('password').setValue('123456');
    this.formGroup.get('confirmarPassword').setValue('123456');
    // this.formGroup.get('fotoPerfil').setValue('');
    // this.formGroup.get('especialidad').setValue('');
    // this.formGroup.get('especialidadInput').setValue('');
  }
  mostrarMensajeOk(mensaje:string){
    Swal.fire({
      title: mensaje,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {

      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('Se envio la encuesta')
      }
    })
  }
  mostrarMensajeError(mensaje:string){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    })
  }

}
