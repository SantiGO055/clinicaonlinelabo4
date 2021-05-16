

import { SpinnerModule } from './../componentes/spinner/spinner.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [
    
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SpinnerModule
    
    
    
    
    
  ]
})
export class IngresoModule { }
