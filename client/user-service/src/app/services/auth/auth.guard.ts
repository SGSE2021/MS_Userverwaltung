import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router){
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(take(1),
      map(user => user.uid!="-1"),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log("User not logged in, redirect to /login");
          console.log(state.url);
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
      }));
  }
  
}
