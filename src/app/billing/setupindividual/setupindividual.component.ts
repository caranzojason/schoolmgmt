


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {FeeDTO} from '../model/FeeDTO';
import {BillingService} from '../services/billing.services';
import { StudentDialog } from '../../common/studentdialog/studentdialog';
import {Student} from '../../commonmodel/Student';
import { YearlyfeeDetail } from '../model/YearlyfeeDetail';
import { Studentfee } from '../model/Studentfee';
import { StudentfeeDetails } from '../model/StudentfeeDetails';
import { VStudentfee } from '../model/VStudentfee';
import {EnrollmentDialog} from '../../common/dialog/enrollmentdialog';

@Component({
  selector: 'app-payment',
  templateUrl: './setupindividual.component.html',
  styleUrls: ['./setupindividual.scss'],
})
export class SetupIndividualComponent {
  studentList:Array<VStudentfee> = [];
  vstudentFee:VStudentfee = {
    "id":0,
    "studentId":0,
    "remarks":"",
    "status":"O",
    "schoolyearfrom":0,
    "schoolyearto":0,
    "lastname":"",
    "firstname":"",
    "departmentname":"",
    "feeTypeId":0
  };
  public deparmentList:any;
  student:Student = {
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
    "departmentname":"",
    "strand": 0,
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
    "semester": 0
  }

  billFormColumns: string[] = ['Description','Amount','Actions'];
  displayedColumns: string[] = ['LastName', 'FirstName','Department','Remarks','Actions'];
  feeList:Array<StudentfeeDetails>;
  dataSource: MatTableDataSource<VStudentfee>;
  dataSourceForm: MatTableDataSource<StudentfeeDetails>;
  public currentTabIndex = 1;
  filter="";
  studentFee:Array<StudentfeeDetails> = [];
  feeDescription:string = "";
  feeAmount:number = 0;
  remarks:string;
  private yearFrom:any;
  private yearTo:any;
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  pageNo = 0;
  feeType:any;

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _billingService:BillingService,private _cookieService:CookieService,public dialog: MatDialog,private changeDetectorRefs: ChangeDetectorRef ) {
      this.yearFrom = this._cookieService.get("yearFrom");
      this.yearTo = this._cookieService.get("yearTo");
    }

    ngAfterViewInit() {
      this._billingService.getIndividualListStudentFee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,"").subscribe((data:any) => 
      {
          this.studentList = data.studentFee;
          this.dataSource = new MatTableDataSource(this.studentList);
          this.dataSource.sort = this.sort;
          this.length = data.NoOfRecords;
      });

      this._billingService.getFeeType().subscribe((data:any) => 
      {
        this.feeType = data;
        console.log(this.feeType);
      });

    }

    onTabChange(event: MatTabChangeEvent) {
      this.currentTabIndex = event.index
      if(event.index == 0){
        this.dataSource = new MatTableDataSource( this.studentList);
        this.dataSource.sort = this.sort;
      }
    }

    search(){
      this._billingService.getIndividualListStudentFee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,this.filter).subscribe((data:any) => 
      {
          this.dataSource = new MatTableDataSource(data.studentFee);
          this.changeDetectorRefs.detectChanges();
      });


    }

    refresh(){
      this.filterInput.nativeElement.value = "";
      this.dataSource.filter = "";
      this.filter = "";
      this._billingService.getIndividualListStudentFee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,"").subscribe((data:any) => 
      {
        this.dataSource = new MatTableDataSource(data.studentFee);
        this.changeDetectorRefs.detectChanges();
      });
     }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }

    
  setStudentDialog(){
    const dialogRef = this.dialog.open(StudentDialog, {
        width: '1000px',
        height: '500px',
        data: {  message: "test"}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
          this.vstudentFee.studentId = result.id;
          this.vstudentFee.firstname = result.firstname;
          this.vstudentFee.lastname = result.lastname;
          this.vstudentFee.departmentname = result.departmentname;
          console.log(this.vstudentFee);
          this._billingService.getAllDepartment().subscribe((data:any) => 
          {
              this.deparmentList = data;
          })

          this._billingService.getYearlyFeeAccordingtoStudent(result.department,result.grade,result.strand,result.courseId,result.semester,2020,2021).subscribe((data:any) => 
          {
            if(data.length > 0 ){
              data.forEach(element => {
                let temp= { id:0, description:element.description,amount:element.amount,studentFeeId:0,feeType:element.feeType} as StudentfeeDetails;
                this.studentFee.push(temp);
              });
              console.log(this.studentFee);
              this.dataSourceForm = new MatTableDataSource( this.studentFee);
            }else{
              this.setDialog("no set up found!");
            }

          })
      });
  }

  addNewFee(){
      console.log("add new");
      let temp=  { id:0, description:this.feeDescription,amount:this.feeAmount,studentFeeId:0,feeType:0} as StudentfeeDetails;
      this.studentFee.push(temp);
      this.dataSourceForm = new MatTableDataSource( this.studentFee);
  }
  removeFee(row){

    this.studentFee.forEach(function(item, index, object) {
      if(item.description == row.description){
        object.splice(index, 1);
      }
    });
    console.log(this.studentFee);
    this.dataSourceForm = new MatTableDataSource( this.studentFee);
  }

  public edit(row)
  {
      this._billingService.getStudentFeeById(row.id).subscribe((data:any) => 
      {
          this.vstudentFee = data;
          this._billingService.getStudentFeeDetailByMastereId(this.vstudentFee.id).subscribe((data:any) => 
          {
              this.studentFee = data;
              this.dataSourceForm = new MatTableDataSource( this.studentFee);
              this.tabGroup.selectedIndex = 1
          });
      });
  }

  getStudentList(){
    this.setStudentDialog();
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


  save(){
    let studFee = {id: this.vstudentFee.id,studentId: this.vstudentFee.studentId, remarks:this.remarks,status:"O",schoolyearfrom:this.yearFrom,schoolyearto:this.yearTo, feeTypeId:0 } as VStudentfee
  
    if(this.vstudentFee.id ==0){
      this.vstudentFee.schoolyearfrom = this.yearFrom;
      this.vstudentFee.schoolyearto = this.yearTo;
      this._billingService.saveStudentFee(this.vstudentFee).subscribe((data:any) => 
      {
        this.vstudentFee.id =  data[0].id;
        this.studentFee.forEach(element => {
          element.studentFeeId = data[0].id;
        });
        
        this._billingService.saveStudentFeeDetail(this.studentFee).subscribe((data:any) => 
        {
          this.setDialog("Sucessfully Save!");
        })
      })
    }else{
      this._billingService.updateStudentFee(studFee).subscribe((data:any) => 
      {
        console.log(data);
        this.studentFee.forEach(element => {
          element.studentFeeId = data[0].id;
        });
        
        this._billingService.updateStudentFeeDetail(this.studentFee).subscribe((data:any) => 
        {
          this.setDialog("Sucessfully Updated!");
        })
      })
    }
  }
}



