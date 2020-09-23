import { Component,Input } from '@angular/core';
import {StudentService} from '../service/student.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: [`
  :host >>> .alert-custom {
    color: #99004d;
    background-color: #f169b4;
    border-color: #800040;
  }
`],
styleUrls: ['./payment.scss'],
})
export class PaymentComponent {

    public enrolNo:any;
    public firstName:any;
    public lastName:any;

    public studentPayment:any = { student_name: "", enrollment_ref_no: "",method:"",amount:0,description:"", status:0,approval_status:0   } //0 is not yet approve or newly created

    public payment:any = {paymentMethod:"",amountToPay:"",paymentDescription:""}
    public url:any = '';
    public fileName:any;
    @Input() public alerts: Array<IAlert> = [];

    @Input() public myFiles:string [] = [];

    public paymentOptions = [
        { name: "Cash", value: "Cash" },
        { name: "Bank", value: "Bank" }
      ];

      public paymentType = [
        { name: "Enrollment Fee", value: "EnrollmentFee" },
        { name: "Bank Account Fee", value: "BankAccountFee" },
        { name: "Enrolment Fee & Bank Account Fee", value: "EnrollmentFeeBankAcount" },
        { name: "Monthly Fee", value: "MonthlyFee" },
        { name: "Quarterly Fee", value: "QuarterlyFee" },
        { name: "Yearly Fee", value: "YearlyFee" }
      ];

    public selectedPaymentOption = "";
    public fileToUpload: File = null;

    constructor(private _studService:StudentService) {

    }

    public onClickRefNo(){
        console.log(this.enrolNo);
        this._studService.getEnrollmentRefNo(this.enrolNo).subscribe((data:any) => 
        {
            this.firstName = data.firstname;
            this.lastName = data.lastname
        })
    }

    handleFileInput(files) {
        console.log(this.enrolNo );
        if (this.enrolNo === undefined ||this.enrolNo === ""){

            this.alerts.push(
                {
                  id: 4,
                  type: 'danger',
                  message: 'Please input enrollment No!'
                }
              );

            return;
        }
        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
        const formData: FormData = new FormData();
        formData.append('uploads', this.fileToUpload, this.fileToUpload.name);

        this._studService.uploadFile(this.enrolNo,formData).subscribe(event => {
         }, error => {
          console.log(error);
        });
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
      }

    public save(){
        this.studentPayment.student_name = this.firstName + " " + this.lastName;
        this.studentPayment.enrollment_ref_no = this.enrolNo;
        this.studentPayment.method = this.payment.paymentMethod;
        this.studentPayment.amount = this.payment.amountToPay;
        this.studentPayment.description = this.payment.paymentDescription;
        
        this._studService.makePayment(this.studentPayment).subscribe((data:any) => 
        {
            console.log(data);
        });
    }

    public cancel(){

    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
  }
