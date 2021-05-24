
import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminComponent } from './componentes/admin/admin.component';

import { NgxSpinnerModule } from "ngx-spinner";
import {SpinnerModule} from './componentes/spinner/spinner.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargarusuarioDirective } from './directivas/cargarusuario.directive';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AltaTurnoComponent } from './componentes/turnos/alta-turno/alta-turno.component';
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnterDirective } from './directivas/enter.directive';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    AdminComponent,
    CargarusuarioDirective,
    AltaTurnoComponent,
    MiperfilComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbCollapseModule,
    NgbModule,
    NavbarModule,
    SweetAlert2Module.forRoot(),
    SpinnerModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NgxSpinnerModule]
})
export class AppModule { }
