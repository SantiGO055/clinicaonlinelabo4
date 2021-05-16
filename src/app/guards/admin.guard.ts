import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router:Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.verificarAdminLogueado();

    

  }
  verificarAdminLogueado(){
    console.log(this.auth.isLogged.email);
    if(this.auth.isLogged.email === 'admin@admin.com' || this.auth.isLogged.admin){

      // this.router.navigate(['/admin']);
      // this.router.navigateByUrl('/admin');
      return true;
    }
    else{
      return false;
    }

  }
  
}
