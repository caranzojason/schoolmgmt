import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor( private _cookieService: CookieService,private _router:Router) {
   
  }

  ngOnInit(): void {
    // this.checksession();
    // setInterval(() => { 
    //   this.checksession() 
    // }, 5000);
  }

  private checksession(){
    let usersession = this._cookieService.get("usersession");
    if(usersession == undefined ){
      this._cookieService.removeAll();
      this._router.navigate(['/authentication/login'],{ replaceUrl: true });
    }
  }
}
