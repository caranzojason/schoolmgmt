import { Component } from '@angular/core';
import {StudentService} from '../service/student.service'

@Component({
  selector: 'app-login',
  templateUrl: './payment.component.html'
})
export class PaymentComponent {

    public refNo:any;
    public firstName:any;
    public lastName:any;

    constructor(private _studService:StudentService) {}

    public onClickRefNo(){
        console.log(this.refNo);
        this._studService.getEnrollmentRefNo(this.refNo).subscribe((data:any) => 
        {
            console.log(data);
            this.firstName = data.firstname;
            this.lastName = data.lastname
        })
    }
}
