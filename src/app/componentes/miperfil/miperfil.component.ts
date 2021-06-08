import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoTurno } from 'src/app/clases/estado-turno';
import { Historia } from 'src/app/clases/historia';
import { Estados } from 'src/app/clases/turnos';
import { Horarios, Turnoesp, User } from 'src/app/clases/user';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import jsPDF, { jsPDFOptions } from 'jspdf';
 import 'jspdf-autotable';
import { autoTable, RowInput } from 'jspdf-autotable';
const imgBase64 = 'data:image/png;base64,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';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  usuarioLogueado: User;
  disponibilidad: string;
  mostrarHorario: boolean;
  especialidad: string;
  disp:Turnoesp[] = [];
  hoy: Date = new Date(Date.now());
  diaSeleccionado: Date = new Date();
  fechaSeleccionada = this.hoy.getFullYear()+'-'+(this.hoy.getMonth()+1)+'-'+this.hoy.getDate()+'T00:00:00';
  minimo = this.hoy.getFullYear()+'-0'+(this.hoy.getMonth()+1)+'-'+(this.hoy.getDate());
  horaSeleccionada: string = '';
  maximo = '2021-12-31';
  arrayHorarios:any[] = [];
  horariosAElegir: any[] = [];
  sliderHoraComienzo: number;
  sliderCantTurnos: number;
  sliderDiaSemana: number = 1;
  sliderDiaSemanaString: string = 'Lunes';
  maxSliderTurno: number = 22;
  maxSliderHora: number = 18;
  turnoAux: Turnoesp;
  historia: Historia[]=[];
  flag: boolean = false;
  seleccioneDia: boolean = false;
  seleccioneHora: boolean = false;
  arrayExcelTurno =  [];

  estados:EstadoTurno[] = []

  constructor(
    private fireSvc: FirebaseService,
    private spinner: NgxSpinnerService,
    private config: NgbCarouselConfig,
    private excel: ExportExcelService

  ) {
    config.interval = 2500;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = false;
    // console.log(this.sliderHoraComienzo);
   }

  calcularSlider(){
    var date = new Date(this.hoy.getTime());
    date.setDate(date.getDate() + (this.sliderDiaSemana +-1) - (date.getDay() + 6) % 7);

    let fecha = date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
    this.fechaSeleccionada = fecha;
    // var currentDay = this.hoy.getDay();
    // console.log(currentDay);
    // var distance = (this.sliderDiaSemana +1) - currentDay;
    // console.log(distance);

    // this.diaSeleccionado.setDate(this.hoy.getDate() + distance);
    // console.log(this.diaSeleccionado);

    if(this.sliderDiaSemana == 1){
      this.sliderDiaSemanaString = 'Lunes';
      this.maxSliderHora = 18;

    }
    if(this.sliderDiaSemana == 2){
      this.sliderDiaSemanaString = 'Martes';
      this.maxSliderHora = 18;


    }
    if(this.sliderDiaSemana == 3){
      this.sliderDiaSemanaString = 'Miercoles';
      this.maxSliderHora = 18;

    }
    if(this.sliderDiaSemana == 4){
      this.sliderDiaSemanaString = 'Jueves';
      this.maxSliderHora = 18;

    }
    if(this.sliderDiaSemana == 5){
      this.sliderDiaSemanaString = 'Viernes';
      this.maxSliderHora = 18;
    }
    if(this.sliderDiaSemana == 6){
      this.sliderDiaSemanaString = 'Sabado';
      this.maxSliderHora = 14;
    }
    // console.log(this.sliderHoraComienzo);
    switch(this.sliderHoraComienzo){
      case 19:
        this.maxSliderTurno = 0;

        break;
      case 18:
        this.maxSliderTurno = 2;

        break;
      case 17:
        this.maxSliderTurno = 4;

        break;
      case 16:
        this.maxSliderTurno = 6;

        break;
      case 15:
        this.maxSliderTurno = 8;
        break;
      case 14:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 0;

        }
        else{

          this.maxSliderTurno = 10;
        }
        break;
      case 13:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 2;

        }
        else{

          this.maxSliderTurno = 12;
        }
        break;
      case 12:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 4;

        }
        else{

          this.maxSliderTurno = 14;
        }
        break;
      case 11:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 6;

        }
        else{

          this.maxSliderTurno = 16;
        }
        break;
      case 10:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 8;

        }
        else{

          this.maxSliderTurno = 18;
        }
        break;
      case 9:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 10;

        }
        else{

          this.maxSliderTurno = 20;
        }
        break;
      case 8:
        if(this.sliderDiaSemana == 6){
          this.maxSliderTurno = 12;

        }
        else{

          this.maxSliderTurno = 22;
        }
        break;
    }
    console.log(this.fechaSeleccionada);
  }

  ngOnInit(): void {

    this.spinner.show();
    this.fireSvc.getAllHistorias().subscribe(historia=>{
      historia.forEach(histo => {
        if(histo.turno.paciente.uid === this.usuarioLogueado.uid){
          this.historia.push(histo);
          this.flag = false;
          this.spinner.hide();
        }
        else{
          this.spinner.hide();
        }
      });
      
      
    });
    this.fireSvc.getAllTurnos().subscribe(turnos=>{
      this.arrayExcelTurno = <any>turnos;
    });
    this.fireSvc.getAllEstados().subscribe(estados=>{
      estados.forEach(estado => {
        if(estado.estado == Estados.REALIZADO){
          this.estados.push(JSON.parse(JSON.stringify(estado)));

        }
      });
    });


    this.sliderDiaSemanaString = 'Lunes';

    // this.botones.forEach(element => {
    //   let horario = {
    //     hora: element,
    //     disponible: true
    //   }
    //   this.horariosAElegir.push(horario);
      
    // });
    // console.log(this.horariosAElegir);
    // console.log(this.minimo)
    // console.log(this.maximo)
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    
    if(this.usuarioLogueado.paciente){
      this.flag = true;

    }
    if(this.usuarioLogueado.especialista){

      console.log(this.usuarioLogueado);
      if(this.usuarioLogueado.disponibilidadEsp != undefined){
        this.usuarioLogueado.disponibilidadEsp.forEach(esp=>{
          if(esp){
  
          }
          console.log(esp);
          this.disp.push(JSON.parse(JSON.stringify(esp)));
          console.log(this.disp);
    
        })

      }
    }

  }
  capturarHora(e){
    // console.log(e)
    
    

      this.horariosAElegir.forEach(element => {
        if(e.target.checked){
            if(element.hora == e.target.value){
      
              
              this.arrayHorarios.push(element);
            }
        }
        else{
          if(element.hora == e.target.value){
            let i = this.arrayHorarios.indexOf( element)
            this.arrayHorarios.splice(i,1);
            console.log(this.arrayHorarios);
            
          }
        }
      });
      console.log(this.arrayHorarios);

    
      

  }
  
  mostrarHorarios(){
    this.mostrarHorario = true;
    console.log(this.minimo)
    console.log(this.maximo)
    console.log(this.fechaSeleccionada);
  }

  calcularArrayHorarios(especialidad:string){
    let aux: number;
    let auxArr: Horarios[] = [];
    let auxStr:any;
    let horarios:any;
    //TODO a la hora de inicio del turno le sumo 0 por el primer turno y 0.30 por cada turno de mas
    //TODO si empiezo a las 10 hs y tengo 3 turnos le sumo 10 + 0 (1 turno) 10+0.30 (2 turnos) 10+0.30 (3 turnos)
    if(this.sliderCantTurnos)
    for (let i = 0; i < this.sliderCantTurnos; i++) {
      
      
      if(i == 0){
        aux = this.sliderHoraComienzo;
        auxStr = aux.toString()
          auxStr = auxStr + ':00';
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
      }
      else{

        aux += 0.50;
        if(aux % 1 == 0){
          auxStr = aux.toString()
          auxStr = auxStr + ':00';
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
        }
        else{
          auxStr = aux.toString().split('.');
          auxStr[1] = "30";
    
          auxStr = auxStr[0]+':'+auxStr[1];
          // horarios.hora = auxStr;
          // horarios.disponible = true;
          horarios = {
            hora: auxStr,
            disponible: true
          }
          auxArr.push(horarios);
        }
        
        // console.log(auxStr);
        
      }
      // console.log(auxArr);
      
    }
    // auxArr contiene horarios y disponibilidad de cada uno
    
    
    // console.log(auxStr[0]+':'+auxStr[1]);

    this.turnoAux = {
      especialidad: especialidad,
      fecha: this.fechaSeleccionada,
      horarios: auxArr
    }
    this.disp.push(JSON.parse(JSON.stringify(this.turnoAux)));

    
    
  }

  seleccionDispo(especialidad: string){

    //TODO continuar esto
    // console.info(this.especialidad)
    console.log()

    const prueba = {
      especialidad: especialidad,
      fecha: this.fechaSeleccionada,
      horarios: this.arrayHorarios,
    };
    console.log(prueba);
    
    this.calcularArrayHorarios(especialidad);
    console.log(this.disp);
    this.usuarioLogueado.disponibilidadEsp = this.disp;
    this.fireSvc.updateUsuario(this.usuarioLogueado);
  //   export class Turnoesp {
  //     especialidad:string;
  //     fecha: string;
  //     horarios: Horarios[];
  // }

    
    // console.info(prueba);
    // this.disp.push(JSON.parse(JSON.stringify(prueba)));
    
    
    // this.usuarioLogueado.disponibilidadEsp = this.disp;
    // this.usuarioLogueado.disponibilidadEsp.slice(0,1)
    // console.log(this.usuarioLogueado)
    // this.fireSvc.updateUsuario(this.usuarioLogueado);
    
    // console.log(this.usuarioLogueado.disponibilidadEsp);
  }
  capturarSelectEspecialidad(value){
    console.log(value);
    
    this.especialidad = value.$ngOptionLabel.trim();
    console.info()
  }

  

  exportarExcel(){
    let reportData = {
      title: 'Listado de usuarios de clinica online',
      data: this.estados,
      headers: [
        'Especialidad',
        'Reseña',
        'Nombre medico',
        'Apellido medico',
        'Email de medico',
        'Dni de medico',
        'Edad de medico',
        'Fecha de atencion',
        'Hora de atencion',
        'Estado de atencion',
        'Nombre Paciente',
        'Apellido Paciente',
        'Dni paciente',
        'Edad paciente',
      ]
    }

    this.excel.exportExcel(reportData);
  }
  exportarPdf(){
    var opt: jsPDFOptions = {
      
    }
    var options = {
      bodyStyles: { valign: 'top' },
      styles: { overflow: 'linebreak', overflowColumns: false },
      headerStyles: {
        fillColor: [51, 122, 183],
        textColor: [255],
        halign: 'center'
    },            
    theme: 'grid',
      columnWidth: 'wrap',
      columnStyles:{
          0: {
              columnWidth: '100'
          },
          1: {
              columnWidth: '20'
          }, 
          2: {
              columnWidth:'30'
          },
          3: {
              columnWidth: '40'
          },
          4: {
              columnWidth: '20'
          }
      }
    }
    const doc = new jsPDF();
    var width = 10;
    var height = 10;
    doc.addImage(imgBase64,'png',0,0,width,height);
    let auxData= [];
    doc.text("Paciente: "+ this.usuarioLogueado.nombre + ", "+this.usuarioLogueado.apellido, 10, 10);
    
    
    (doc as jsPDF & { autoTable: autoTable }).autoTable({ head: [[
      'Especialidad',
        'Reseña',
        'Nombre medico',
        'Apellido medico',
        'Fecha',
        'Hora',
    ]]});

    this.estados.forEach(d => {
      
      let objAux:any = {
        especialidad: d.especialidad,
        resenia: d.comentarioMedico,
        nombreMedico: d.especialista.nombre,
        apellidoMedico: d.especialista.apellido,
        fechaAtencion: d.fecha,
        horaAtencion: d.hora,


        
      }
      auxData.push(objAux);

      (doc as jsPDF & { autoTable: autoTable }).autoTable({ body: [objAux] as unknown as RowInput[],
        columnStyles: 
        {
          0: {
            cellWidth: 40
          },
          1: {
            cellWidth: 25
          }, 
          2: {
            cellWidth: 50
          },
          3: {
            cellWidth: 30
          },
          4: {
            cellWidth: 20
          },
          5: {
            cellWidth: 20
          }
        }
        
      })
    });

    
    

    console.log(auxData);

    
    
    
    
    doc.save('prueba.pdf')
  }

}
