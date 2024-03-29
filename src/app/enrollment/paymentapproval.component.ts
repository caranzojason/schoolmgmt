import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentDialog } from '../common/dialog/enrollmentdialog';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnrollmentService } from './service/enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { Enrollment } from './model/Enrollment';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute,Router} from '@angular/router';
import { Payment } from './model/Payment';
import { MatTableModule } from '@angular/material/table';
import {MatTable} from '@angular/material';

@Component({
  templateUrl: './paymentapproval.component.html',
  styleUrls: ['./inquiry.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentApprovalComponent implements AfterViewInit {
  refNo:string = "";
  enrolmentList:Array<Enrollment>;
  paymentList:Array<Payment>;
  subtitle: string;
  displayedColumns: string[] = ['enrollment_ref_no', 'student_name', 'method','description','amount','status','actions'];
//   dataSource: MatTableDataSource<Enrollment>;
  dataSource: MatTableDataSource<Payment>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  public payment:any = {paymentMethod:"",amountToPay:"",paymentDescription:""}
  public firstName:any;
  public lastName:any;
  public alreadyMakePaymentB4:boolean = false;
  public enrolNo:any;
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
  public listpayment:Payment = {
    "id": 0,
    "ref_no": "",
    "student_name":"",
    "enrollment_ref_no":"",
    "method":"",
    "amount":0,
    "description":"",
    "attachment":"",
    "approval_remarks":"",
    "approval_status":0,
    "approval_by":0,
    "approval_date":"",
    "created_at":"",
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
  @Input() hasPagination = true
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  filter1="";
  pageNo = 0;
  // MatPaginator Output
  pageEvent: PageEvent;
  public enrolmentStatus:string = "pending";

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  // @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;
  @ViewChild(MatTable,{static:false}) table: MatTable<any>;
  constructor(private _enrollService:EnrollmentService,public dialog: MatDialog, private _route: ActivatedRoute, private changeDetectorRefs: ChangeDetectorRef) {
    this.subtitle = 'for verification';

  }
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this._enrollService.getPaymentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
    {
      this.paymentList = data.EnrollmentPayment;
      this.dataSource = new MatTableDataSource( this.paymentList);
     // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator.length = data.NoOfRecords;
      this.length = data.NoOfRecords;
      console.log(this.dataSource);
    });
  }

  initData(){
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this._enrollService.getPaymentList(0,this.pageSize,"").subscribe((data:any) => 
    {
      this.paymentList = data.EnrollmentPayment;
      this.dataSource = new MatTableDataSource( this.paymentList);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator.length = data.NoOfRecords;
      this.length = data.NoOfRecords;
      
    });
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filter = filterValue;
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

  }

  public selectDepartment()
  {
      this.schoolsemesterList= [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}];
      if(this.enrollment.department != 5){//not equal to colege
          this._enrollService.getGrades(this.enrollment.department).subscribe((data:any) => 
          {
              this.gradesList = data;
          });
      }else{
          this.gradesList = [{id:0,name:"N/A"}];
      }

      if(this.enrollment.department == 1 || this.enrollment.department == 2){ //elem,junio
          this.trackStandardCourse =  [{id:0,name:"N/A"}];
          //asign to default value
          if(this.enrollment.department == 1){
              this.enrollment.grade = 1;
          }else{
              this.enrollment.grade = 9;
          }
          this.gradesList = [{id:0,name:"N/A"}];
          this.schoolsemesterList = [{id:0,name:"N/A"}];
          
      }

      if(this.enrollment.department == 3 ) //senior
      {
          //set default selected value
          this.enrollment.grade = 13;
          this.enrollment.strand = 1;
          this.enrollment.semester = 1;
          this._enrollService.getStrand().subscribe((data:any) => 
          {
              this.trackStandardCourse = data;
          });
      }
      if(this.enrollment.department == 4 || this.enrollment.department == 5 ){//,colege, master grad
          this.enrollment.grade = 15;
          this.enrollment.strand = 1;
          this.enrollment.semester = 1;
          this._enrollService.getCoursesByDeptId(this.enrollment.department).subscribe((data:any) => 
          {
              this.trackStandardCourse = data;
          });
      }
  }

  public edit(row)
  {
      let ref = row.enrollment_ref_no
    this._enrollService.getEnrollRefNo(ref).subscribe((data:any) => 
    {
        this.enrollment = data;
        console.log(this.enrollment);
        if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
        else{
          const [year, month, day] = this.enrollment.dob.split('-');
          const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
          this.enrollment.dob = obj;
        }
        this.changeDetectorRefs.detectChanges();
    });
    this.selectDepartment();
    this.tabGroup.selectedIndex = 2
  }
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
    { name: "Others", value: "Others" },
    
  ];
  public editPayment(row)
  {
    this.refNo = row.enrollment_ref_no;
    this.initPayment(this.refNo);
    this.tabGroup.selectedIndex = 1
  }

  public initPayment(enrolNo){
    this.enrolNo = enrolNo;
    this._enrollService.getEnrollRefNo(enrolNo).subscribe((data:any) => 
    {
      this.enrolmentStatus = data.status;
      if(data.firstname === undefined){
        this.setDialog('Reference No/Enrol no not Found!')
        return;
      }
        this.firstName = data.firstname;
        this.lastName = data.lastname

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

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index
    if(event.index == 0){

      this._enrollService.getPaymentList(0,this.pageSize,"").subscribe((data:any) => 
      {
        this.paymentList = data.EnrollmentPayment;
        this.dataSource = new MatTableDataSource( this.paymentList);
        this.changeDetectorRefs.detectChanges();
      });
    }
  }

  public verify(){
    var scope = this;

    if(this.enrollment.type == null){
      this.setDialog("Please select old or new student!");
      return;
    }
  
    if(this.enrollment.lastname == ""){
        this.setDialog("LastName is required!");
        return;
    }

    if(this.enrollment.firstname == ""){
        this.setDialog("Firstname is required!");
        return;
    }

    if(this.enrollment.age <= 0){
        this.setDialog("Age is required!");
        return;
    }

    if(this.enrollment.gender == ''){
        this.setDialog("Gender is required!");
        return;
    }

    if(this.enrollment.department == 0){
        this.setDialog("Department is required!");
        return;
    }

    if(this.enrollment.grade == 0){
        this.setDialog("Grade is required!");
        return;
    }

    // if(this.enrollment.strand == 0 && (this.enrollment.department > 2)){
    //     this.setDialog("Track & Strand is required!");
    //     return;
    // }

    if(this.enrollment.address == ''){
        this.setDialog("Address is required!");
        return;
    }

    if(this.enrollment.dob == ''){
        this.setDialog("Date of birth is required!");
        return;
    }

    if(this.enrollment.place_of_birth == ''){
        this.setDialog("Place of birth is required!");
        return;
    }

    if(this.enrollment.contactno == ''){
        this.setDialog("Contact No is required!");
        return;
    }
    
    if(this.enrollment.email == ''){
        this.setDialog("Email is required!");
        return;
    }

    if(this.enrollment.fathername == ''){
        this.setDialog("Father's name is required!");
        return;
    }

    if(this.enrollment.fathercontact == ''){
        this.setDialog("Father's Contact No is required!");
        return;
    }

    if(this.enrollment.mothername == ''){
        this.setDialog("Mother's name is required!");
        return;
    }

    if(this.enrollment.mothercontact == ''){
        this.setDialog("Mother's Contact No required!");
        return;
    }

    if((this.enrollment.fathername == '' && this.enrollment.mothername == '') && this.enrollment.guardian_name == '' ){
        this.setDialog("Guardian Name required!");
        return;
    }

    if(this.enrollment.guardian_name != '' && this.enrollment.guardian_contactno == '' ){
        this.setDialog("Guardian Contact required!");
        return;
    }


    if(this.enrollment.learning_modality == ''){
        this.setDialog("Learning modality is required!");
        return;
    }

    console.log(this.enrollment.schoolyearfrom);
    if(this.enrollment.schoolyearfrom == 0|| this.enrollment.schoolyearto == null){
        this.setDialog("School Year from is required!");
        return;
    }

    if(this.enrollment.schoolyearto == 0 || this.enrollment.schoolyearto == null){
        this.setDialog("School Year To is required!");
        return;
    }
    this._enrollService.updateStatus(this.enrollment).subscribe((data:any) => 
    {
        const dialogRef = this.dialog.open(EnrollmentDialog, {
          width: '300px',
          data: {  message: "Successfully Verified!"}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          scope.tabGroup.selectedIndex = 0;
          console.log(scope.tabGroup.selectedIndex );
        });
    });
  }


  pageEvents(event: any) {
    this._enrollService.getPaymentList(event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
    {
      this.paymentList = data.EnrollmentPayment;
      this.dataSource = new MatTableDataSource( this.paymentList);
      this.changeDetectorRefs.detectChanges();
    });
 }

 search(){
   this._enrollService.getPaymentList(0,this.pageSize,this.filter).subscribe((data:any) => 
   {
    this.paymentList = data.EnrollmentPayment;
    this.dataSource = new MatTableDataSource( this.paymentList);
    this.changeDetectorRefs.detectChanges();
    console.log(this.length);
   });
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

 approvepayment(){
  var scope = this;
  scope.tabGroup.selectedIndex = 0;
    this._enrollService.approvePayment(this.refNo ).subscribe((data:any) => 
    {
      if(data.ref_no !== undefined){
     
        this._enrollService.getPaymentList(0,this.pageSize,"").subscribe((data:any) => 
        {
          console.log(data);
          this.paymentList = data.EnrollmentPayment;

          this.dataSource.data = this.paymentList;
           this.changeDetectorRefs.detectChanges();
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.dataSource.paginator.length = data.NoOfRecords;
          this.length = data.NoOfRecords;
         
          this.setDialog("Successfully Approved!");
        });
      }
    });
 }

 disaprovepayment(){
  var scope = this;
  scope.tabGroup.selectedIndex = 0;
  this._enrollService.approvePayment(this.refNo ).subscribe((data:any) => 
  {
    //todo add are you sure
    if(data.ref_no !== undefined){
      this.setDialog("Successfully DisApproved!");
      this.initData();
      return;
    }

  });
 }

 refresh(){
  this.filterInput.nativeElement.value = "";
  this.dataSource.filter = "";
  this.filter = "";
  this._enrollService.getPaymentList(0,this.pageSize,"").subscribe((data:any) => 
  {
    console.log( data.NoOfRecords);
    this.paymentList = data.EnrollmentPayment;
    this.length = data.NoOfRecords;
    this.dataSource = new MatTableDataSource( this.paymentList);
    this.changeDetectorRefs.detectChanges();
  });
 }
}
