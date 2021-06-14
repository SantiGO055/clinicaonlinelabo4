import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimation, slideTurno } from './route-transition-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInOutAnimation,
    slideTurno],

    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
  
})
export class AppComponent {
  title = 'clinicaonlinelabo4';
  toggleNavbar:boolean = false;
  
  prepareRoute(outlet: RouterOutlet) {
    
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animation'];
   }

}
