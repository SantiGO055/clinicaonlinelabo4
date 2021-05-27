import { Especialidad } from "./especialidad";
import { User } from "./user";

export enum Estados {
    ACEPTADO = 'ACEPTADO',
    REALIZADO = 'REALIZADO',
    RECHAZADO = 'RECHAZADO',
  }
  
export class Turnos {
    id:string;
    fecha:string;
    hora:string;
    paciente:User;
    especialista:User;
    especialidad:string;
    estado: string;
    descripcion:string;
    constructor(){
      this.estado = Estados.RECHAZADO;
    }
    
}
