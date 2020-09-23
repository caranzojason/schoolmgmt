import { Component } from '@angular/core';
import {UserService} from '../service/user.service';
import { CookieService } from 'ngx-cookie';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginform = true;
  recoverform = false;
  public user:any = {username:"",password:""};
  public message:string;

  constructor(private _userService:UserService,private _cookieService: CookieService, private _router:Router) { }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  login(){
    this._userService.login(this.user).subscribe((data:any) => 
    {
        if(data.found === true){
          this._cookieService.put("username",data.username);
          this._cookieService.put("usersession",data.session);
          if(data.username == 'registrar'){
            this._router.navigate(['/enrollment'],{ replaceUrl: true });
          }else{
            this._router.navigate(['/myenrollment'],{ replaceUrl: true });
          }
        }else{
          console.log(data[0].message);
          this.message = data[0].message;
        }
    });
  }
}
