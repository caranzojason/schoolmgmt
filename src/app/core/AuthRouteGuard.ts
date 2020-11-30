
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthRouteGuard implements CanActivate {

    constructor( private _cookieService: CookieService,private _router:Router) {
   
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
            // console.log(route.url[0].path)
            // let usersession = this._cookieService.get("usersession");
            // let username = this._cookieService.get("username");
            // if(usersession == undefined  ){
            //     this._router.navigate(['authentication/login'],{ replaceUrl: true });
            // }else if(route.url[0].path != 'myenrollment' && username !== 'registrar' ){
            //     this._router.navigate(['myenrollment'],{ replaceUrl: true });
            // }

            return true;
      }

}