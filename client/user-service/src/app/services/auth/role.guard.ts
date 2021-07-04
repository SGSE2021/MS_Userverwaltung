import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(take(1),
      map(user => user.uid!="-1"),
      tap(loggedIn => {
          const userRole = this.auth.user.getValue().role;
          console.log("Role",userRole);
          console.log("RouteROle",route.data.role);
          if(route.data.role &&route.data.role !== userRole){
            console.log("User is not allowed the following route")
            this.router.navigate(['/']);
          }
      }));
  }
  
}
