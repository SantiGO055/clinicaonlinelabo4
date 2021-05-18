import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
  
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  constructor(config: NgbCarouselConfig,
    ) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
   }
  images = [
    {title: 'First Slide', short: 'First Slide Short', src: "./assets/hospital1.jpg"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "./assets/hospital2.jpg"},
    {title: 'Third Slide', short: 'Third Slide Short', src: "./assets/hospital3.jpg"}
  ];

  ngOnInit(): void {
    
  }
}
