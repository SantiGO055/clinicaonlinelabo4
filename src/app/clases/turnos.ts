import { Especialidad } from "./especialidad";
import { User } from "./user";

export class Turnos {
    id:string;
    fecha:string;
    hora:string;
    paciente:User;
    especialista:User;
    especialidad:Especialidad;
}
