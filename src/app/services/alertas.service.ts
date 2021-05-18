import { Injectable } from '@angular/core';
import Swal from'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  public reenvioEmail:boolean = false;
  constructor() { }
  async mostrarAlertaConfirmacionEmail(mensaje:string,titulo:string,mensajeConfirmed:string){
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reenviar email de verificación'
    });
    if (result.isConfirmed) {
      Swal.fire(
        'Enviado!',
        mensajeConfirmed,
        'success'
      );
      this.reenvioEmail = true;
    }
    else {
      this.reenvioEmail = false;

    }
    return result;
  }
  mostraAlertaSimple(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    })
  }
  
}
