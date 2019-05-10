import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const expectedRole = next.data.expectedRole;
      const currentActor = this.authService.getCurrentActor();
      let result = false;
      if (currentActor) {
        const activateRole = new RegExp(currentActor.role.toString(), 'i');
        if (expectedRole.search(activateRole) !== -1) {
          result = true;
        } else {
          this.router.navigate(['denied-access'], { queryParams: { previousURL: state.url } });
        }
        resolve(result);
      } else {
        if (expectedRole.indexOf('anonymous') !== -1) {
          console.log('ok' + result);
          result = true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        }
        resolve(result);
      }
    });
  }
}
