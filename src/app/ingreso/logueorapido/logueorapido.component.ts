import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-logueorapido',
  templateUrl: './logueorapido.component.html',
  styleUrls: ['./logueorapido.component.css']
})
export class LogueorapidoComponent implements OnInit {

  @Input()usuarios: any;
  @Output()eventoLogueoUsuario:EventEmitter<any> = new EventEmitter<any>();
  // spinner:boolean = true;
  constructor() { }

  ngOnInit(): void {
    
  }
  loguear(usuario: User){
    this.eventoLogueoUsuario.emit(usuario);
  }

}
