// import { Component,Input,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
// import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
// import { CookieService } from 'ngx-cookie';
// import { EnrollmentService } from './service/enrollment.service';
// import { Enrollment } from './model/Enrollment';
// import { Payment } from './model/Payment';
// import { MatTableDataSource } from '@angular/material/table';
// import {ThemePalette} from '@angular/material/core';

import { Component,Input, AfterViewInit,ViewChild,ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Enrollment } from './model/Enrollment';
import {EnrollmentService} from './service/enrollment.service';
import {ThemePalette} from '@angular/material/core';
import { MatTabChangeEvent,MatTabGroup } from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CookieService } from 'ngx-cookie';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
// changeDetection: ChangeDetectionStrategy.OnPush
})


export class PaymentApprovalWalkinComponent {
  enrolmentList:Array<Enrollment>;
  subtitle: string;
  displayedColumns: string[] = ['ref_no', 'lastname', 'firstname', 'email','status','actions'];
  dataSource: MatTableDataSource<Enrollment>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  public enrollment:Enrollment = {
    "id": 0,
    "ref_no": "",
    "type": null,
    "studentno": "",
    "firstname": "",
    "middlename": "",
    "lastname": "",
    "email": "",
    "grade": 0,
    "department": 1,
    "strand": 0,
    "courseId": 0,
    "dob": "",
    "place_of_birth": "",
    "contactno": "",
    "address": "",
    "nationality": "Filipino",
    "age": 0,
    "gender": "",
    "religion": "",
    "fathername": "",
    "fatherocc": "",
    "fathercontact":"",
    "fatherplace": "",
    "mothername": "",
    "motherocc": "",
    "mothercontact": "",
    "motherplace": "",
    "guardian_name": "",
    "guardian_contactno": "",
    "guardian_relation": "",
    "last_school_attended": "",
    "last_school_grade_level": "",
    "last_school_date_of_attendance": "",
    "last_school_address": "",
    "last_school_year": "",
    "indigenous": "no",
    "learning_modality": "",
    "status": "",
    "validated_by": "",
    "approved_by": "",
    "cancelled_by": 0,
    "updated_by": "",
    "remarks": "",
    "created_at": "",
    "school_year": 0,
    "schoolyearfrom": 0,
    "schoolyearto": 0,
    "semester": 0,
    "subjectToEnroll":""
}

public deparmentList:any;
public gradesList:any =  [{id:0,name:""}];
public trackStandardCourse:any = [{id:0,name:""}];
public schoolyearList:any = [{id:2020,name:"2020"},{id:2021,name:"2021"},{id:2022,name:"2022"}];
public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer
maxDate ={year: new Date().getUTCFullYear()+30,month: 12, day: 31}
minDate ={year: new Date().getUTCFullYear()-90,month: 12, day: 31}
startDate={year: new Date().getUTCFullYear()-15,month: new Date().getUTCMonth(), day: 1}
public currentTabIndex = 1 

 //payment
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

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

  constructor(private _cookieService: CookieService,private _enrollService:EnrollmentService,public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
    this.subtitle = 'Walk-in Payment';
    // let enrolNo = this._cookieService.get("username");
    // this.initData(enrolNo);
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

  public initData(enrolNo){
    this.enrolNo = enrolNo;
    this._enrollService.getEnrollmentRefNo(enrolNo).subscribe((data:any) => 
    {
      this.enrolmentStatus = data.status;
      if(data.firstname === undefined){
        this.setDialog('Reference No/Enrol no not Found!')
        return;
      }
        this.firstName = data.firstname;
        this.lastName = data.lastname;

        this.changeDetectorRefs.detectChanges();
        this._enrollService.getPayment(enrolNo).subscribe((data:any) => 
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
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this._enrollService.getEnrollmentForPayment().subscribe((data:Array<Enrollment>) => 
    {
        this.enrolmentList = data;
        console.log(this.enrolmentList);
        this.dataSource = new MatTableDataSource( this.enrolmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  


  public edit(row)
  {
    console.log(row);
     let enrolNo = row.ref_no;
     this.initData(enrolNo);
    // this.enrollment = row;
    // this.enrollment.schoolyearfrom = Number(this.enrollment.schoolyearfrom);
    // this.enrollment.schoolyearto = Number(this.enrollment.schoolyearto);
    // this.enrollment.strand = Number(this.enrollment.strand);
    // this.enrollment.grade = Number(this.enrollment.grade);
    // if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
    // else{
    //   const [year, month, day] = this.enrollment.dob.split('-');
    //   const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
    //   this.enrollment.dob = obj;
    //   this.changeDetectorRefs.detectChanges();
    // }
 
    // this.selectDepartment();
    this.tabGroup.selectedIndex = 1
 
  }

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index
    if(event.index == 0){
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }




  
 refresh(){
  this._enrollService.getEnrollmentForVerification().subscribe((data:Array<Enrollment>) => 
  {
      this.enrolmentList = data;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  // if(!this.isUploaded && this.payment.filename == '' ){
  //   this.setDialog('Please upload file!')
  //   return;
  // }
  this.studentPayment.student_name = this.firstName + " " + this.lastName;
  this.studentPayment.enrollment_ref_no = this.enrolNo;
  this.studentPayment.method = this.payment.paymentMethod;
  this.studentPayment.amount = this.payment.amountToPay;
  this.studentPayment.description = this.payment.paymentDescription;

  this._enrollService.getPayment(this.enrolNo).subscribe((data:any) => 
  {
    if(data.method !== undefined){
      this.payment.paymentMethod = data.method;
      this.payment.amountToPay = data.amount;
      this.payment.paymentDescription = data.description;
      this.payment.attachmentpath = data.attachmentpath;
      this.payment.filename =data.filename;
      this.alreadyMakePaymentB4 = true;
      this.changeDetectorRefs.detectChanges();
      this.setDialog('Payment alredy approved!')
    }else{
      this._enrollService.makePayment(this.studentPayment).subscribe((data:any) => 
      {
        this.setDialog('Payment transaction is successful. Please wait for approval.')
        // this._enrollService.uploadFile(this.enrolNo,this.formData).subscribe(event => {
        
        //   this.setDialog('Payment transaction is successful. Please wait for approval.')
        //  }, error => {
        //   console.log(error);
        // });
        this.initData(this.enrolNo);
      });
    }

  });


}
}


