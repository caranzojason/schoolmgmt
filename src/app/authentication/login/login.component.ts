import { Component, ElementRef, ViewChild } from '@angular/core';
import {UserService} from '../service/user.service';
import { CookieService } from 'ngx-cookie';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('noimg', {static: false}) noimg: ElementRef;
  loginform = true;
  recoverform = false;
  public user:any = {username:"",password:""};
  public message:string;
  public mdiIcon:string;

  constructor(private _userService:UserService,private _cookieService: CookieService, private _router:Router) { }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  login(){
    this._userService.login(this.user).subscribe((data:any) => 
    {
        if(data.found === true){


          let temp = data;
          this._userService.getActiveSchoolYear().subscribe((data:any) => 
          {
            this._cookieService.put("username",temp.username);
            this._cookieService.put("usersession",temp.session);
            this._cookieService.put("yearFrom",data.yearfrom);
            this._cookieService.put("yearTo",data.yearto);

            if(temp.username == 'registrar'){
              this._router.navigate(['/enrollment'],{ replaceUrl: true });
            }else{
              this._router.navigate(['/student/myenrollment'],{ replaceUrl: true });
            }

          });


        }else{
          this.message = data[0].message;
          console.log(data[0].message);
          this.mdiIcon ='<i class="mdi mdi-close-circle"></i>'
           this.noimg.nativeElement.innerHTML = this.mdiIcon;
        }
    });
  }
}
