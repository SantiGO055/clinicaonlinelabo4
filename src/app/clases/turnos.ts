import { Especialidad } from "./especialidad";
import { User } from "./user";

export class Turnos {
    id:string;
    fecha:string;
    paciente:User;
    especialista:User;
    especialidad:string;
}
