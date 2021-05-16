
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

import {SpinnerModule} from './componentes/spinner/spinner.module'
@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    AdminComponent,
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
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
