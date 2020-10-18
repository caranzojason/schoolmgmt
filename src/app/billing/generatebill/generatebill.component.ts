


import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { GenerateService } from './service/generate.service';

@Component({
  selector: 'app-payment',
  templateUrl: './generatebill.component.html',
  styleUrls: ['./generatebill.scss'],
})
export class GenerateBillComponent {
    yearFrom:any;
    yearTo:any

    constructor(private _cookieService:CookieService,private _generateService:GenerateService) {
      this.yearFrom = this._cookieService.get("yearFrom");
      this.yearTo = this._cookieService.get("yearTo");
    }

    ngAfterViewInit() {

    }

    generateBill(){
        this._generateService.generateBill(this.yearFrom,this.yearTo).subscribe((data:any) => 
        {
        });
        
    }
}



