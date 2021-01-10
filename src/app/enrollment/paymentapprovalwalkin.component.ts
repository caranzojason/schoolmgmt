import { Component,Input,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
import { CookieService } from 'ngx-cookie';
import { EnrollmentService } from './service/enrollment.service';
import { Enrollment } from './model/Enrollment';
import { Payment } from './model/Payment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment',
  templateUrl: './paymentapprovalwalkin.component.html',
  styles: [`
  :host >>> .alert-custom {
    color: #99004d;
    background-color: #f169b4;
    border-color: #800040;
  }
`],
styleUrls: ['./payment.scss'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentApprovalWalkinComponent {

//   enrolmentList:Array<Enrollment>;
//   paymentList:Array<Payment>;
//   subtitle: string;
//   displayedColumns: string[] = ['enrollment_ref_no', 'student_name', 'method','description','amount','status','actions'];
// //   dataSource: MatTableDataSource<Enrollment>;
//   dataSource: MatTableDataSource<Payment>;

  // constructor(private _enrollService:EnrollmentService,public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    // this.subtitle = 'for verification';

  // }

  /*
    public alreadyMakePaymentB4:boolean = false;
    public enrolmentStatus:string = "pending";
    public enrolNo:string ="";
    public firstName:any;
    public lastName:any;
    formData: FormData;
    isUploaded:boolean = false;
    public studentPayment:any = { student_name: "", enrollment_ref_no: "",method:"",amount:0,description:"", status:0,approval_status:0,attachmentpath:"",filename:""  } //0 is not yet approve or newly created

    public payment:any = {paymentMethod:"",amountToPay:0,paymentDescription:"",attachmentpath:"",filename:"" }
    public url:any = '';
    public fileName:any = '';
    @Input() public alerts: Array<IAlert> = [];

    @Input() public myFiles:string [] = [];

    public paymentOptions = [
        { name: "Cash", value: "Cash" },
        { name: "Bank", value: "Bank" }
      ];

      public paymentType = [
        { name: "Enrollment Fee", value: "EnrollmentFee" },
        { name: "Back Account Fee", value: "Back Account Fee" },
        { name: "Enrolment Fee & Back Account Fee", value: "EnrollmentFeeBackAcount" },
        { name: "Monthly Fee", value: "MonthlyFee" },
        { name: "Quarterly Fee", value: "QuarterlyFee" },
        { name: "Yearly Fee", value: "YearlyFee" },
        { name: "Others", value: "Others" }
      ];

    public selectedPaymentOption = "";
    public fileToUpload: File = null;

    constructor(private _studService:EnrollmentService,public dialog: MatDialog,private _cookieService: CookieService,private changeDetectorRefs: ChangeDetectorRef) {
      let enrolNo = this._cookieService.get("username");
      this.initData(enrolNo);
    }

    public onClickRefNo(){
        if(this.enrolNo == ""){
          this.setDialog('Reference No/Enrol no not Found!')
          return;
        }
        this._studService.getEnrollmentRefNo(this.enrolNo).subscribe((data:any) => 
        {
          if(data.firstname === undefined){
            this.setDialog('Reference No/Enrol no not Found!')
            return;
          }
            this.firstName = data.firstname;
            this.lastName = data.lastname

            this._studService.getPayment(this.enrolNo).subscribe((data:any) => 
            {
              // {paymentMethod:"",amountToPay:0,paymentDescription:""}
              this.payment.paymentMethod = data.method;
              this.payment.amountToPay = data.amount;
              this.payment.paymentDescription = data.description;
              this.payment.attachmentpath = data.attachmentpath;
              this.payment.filename =data.filename;
            })
        });
    }

    public initData(enrolNo){
      this.enrolNo = enrolNo;
      this._studService.getEnrollmentRefNo(enrolNo).subscribe((data:any) => 
      {
        this.enrolmentStatus = data.status;
        if(data.firstname === undefined){
          this.setDialog('Reference No/Enrol no not Found!')
          return;
        }
          this.firstName = data.firstname;
          this.lastName = data.lastname;

          this.changeDetectorRefs.detectChanges();
          this._studService.getPayment(enrolNo).subscribe((data:any) => 
          {
            if(data.method !== undefined){
              this.payment.paymentMethod = data.method;
              this.payment.amountToPay = data.amount;
              this.payment.paymentDescription = data.description;
              this.payment.attachmentpath = data.attachmentpath;
              this.payment.filename =data.filename;
              this.alreadyMakePaymentB4 = true;
              this.changeDetectorRefs.detectChanges();
            }
          })
      });
  }

    handleFileInput(files) {
      if(this.enrolNo == ""){
        this.setDialog('Reference No is required!')
        return;
      }

        this.fileToUpload = files.item(0);
        this.fileName = this.fileToUpload.name;
        this.formData = new FormData();
        this.formData.append('uploads', this.fileToUpload, this.fileToUpload.name);
          this.isUploaded = true;
    }

    setDialog(message){
        const dialogRef = this.dialog.open(EnrollmentDialog, {
            width: '300px',
            data: {  message: message}
        });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public save(){

      if(this.enrolNo == ""){
        this.setDialog('Reference No is required!')
        return;
      }

      if(this.payment.paymentMethod == ""){
        this.setDialog('Please select payment method')
        return;
      }

      if(this.payment.amountToPay == 0){
        this.setDialog('Amount to Pay is required')
        return;
      }

      if(this.payment.paymentDescription == ""){
        this.setDialog('Payment description is required')
        return;
      }

      if(!this.isUploaded && this.payment.filename == '' ){
        this.setDialog('Please upload file!')
        return;
      }
      this.studentPayment.student_name = this.firstName + " " + this.lastName;
      this.studentPayment.enrollment_ref_no = this.enrolNo;
      this.studentPayment.method = this.payment.paymentMethod;
      this.studentPayment.amount = this.payment.amountToPay;
      this.studentPayment.description = this.payment.paymentDescription;

      this._studService.getPayment(this.enrolNo).subscribe((data:any) => 
      {
        if(data.method !== undefined){
          this.payment.paymentMethod = data.method;
          this.payment.amountToPay = data.amount;
          this.payment.paymentDescription = data.description;
          this.payment.attachmentpath = data.attachmentpath;
          this.payment.filename =data.filename;
          this.alreadyMakePaymentB4 = true;
          this.changeDetectorRefs.detectChanges();
          this.setDialog('Payment already approved!')
        }else{
          this._studService.makePayment(this.studentPayment).subscribe((data:any) => 
          {
            this._studService.uploadFile(this.enrolNo,this.formData).subscribe(event => {
            
              this.setDialog('Payment transaction is successful. Please wait for approval.')
             }, error => {
              console.log(error);
            });
            this.initData(this.enrolNo);
          });
        }
    
      });


    }

    public cancel(){
      this.enrolNo = "";
      this.payment= {paymentMethod:"",amountToPay:0,paymentDescription:""}
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
  }
  */
}
