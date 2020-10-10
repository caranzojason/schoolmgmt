


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

@Component({
  selector: 'app-payment',
  templateUrl: './setupindividual.component.html',
  styleUrls: ['./setupindividual.scss'],
})
export class SetupIndividualComponent {
  studentList:Array<Student> = [];
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
    "semester": 0,
  }

  billFormColumns: string[] = ['Description','Amount','Actions'];
  displayedColumns: string[] = ['Code', 'Description','Status','Actions'];
  feeList:Array<FeeDTO>;
  dataSource: MatTableDataSource<FeeDTO>;
  dataSourceForm: MatTableDataSource<StudentfeeDetails>;
  public currentTabIndex = 1;
  filter="";
  studentFee:Array<StudentfeeDetails> = [];
  feeDescription:string = "";
  feeAmount:number = 0;
  remarks:string;

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _billingService:BillingService,public dialog: MatDialog, ) {
    
    }

    ngAfterViewInit() {
      // this._billingService.getBillingAllFee().subscribe((data:any) => 
      // {
      //     this.billingFee = data;
      //     this.dataSourceForm = new MatTableDataSource( this.billingFee);
      //     console.log(this.billingFee);
      // })
    }

    onTabChange(event: MatTabChangeEvent) {
      this.currentTabIndex = event.index
      if(event.index == 0){
        this.dataSource = new MatTableDataSource( this.feeList);
        this.dataSource.sort = this.sort;
      }
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
          this.student = result;
          this._billingService.getAllDepartment().subscribe((data:any) => 
          {
              this.deparmentList = data;
          })

          this._billingService.getYearlyFeeAccordingtoStudent(1,1,0,0,2020,2021).subscribe((data:any) => 
          {
            data.forEach(element => {
              let temp= { id:0, description:element.description,amount:element.amount,studentFeeId:0} as StudentfeeDetails;
              this.studentFee.push(temp);
            });
            console.log(this.studentFee);
            this.dataSourceForm = new MatTableDataSource( this.studentFee);
          })
      });
  }

  addNewFee(){
    console.log("add new");
    let temp=  { id:0, description:this.feeDescription,amount:this.feeAmount,studentFeeId:0} as StudentfeeDetails;
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
  // this.studentFee.forEach(function (value, i) {
  //   if(value.description == row.description){
      
  //   }
  //   console.log('%d: %s', i, value);
  // });


  // this.studentFee.forEach(element => {
  //   if(element.description == row.description){
  //     this.
  //   }
  // });
  //  console.log(row);
 }


  getStudentList(){
    this.setStudentDialog();
  }

  /*
              this.billingFee.forEach(element => {
                element.yearlyFeesId = data[0].Id;
            });
            console.log(this.billingFee);
            this._yearlyFeeService.saveYearlyFeeDetail(this.billingFee).subscribe((data:any) => 
            {
                console.log(data);
            });
  */

  save(){
    let studFee = {studentId: this.student.id, remarks:this.remarks,status:"O",schoolyearfrom:this.student.schoolyearfrom,schoolyearto:this.student.schoolyearto } as Studentfee

    this._billingService.saveStudentFee(studFee).subscribe((data:any) => 
    {
      this.studentFee.forEach(element => {
        element.studentFeeId = data[0].id;
      });
      
      this._billingService.saveStudentFeeDetail(this.studentFee).subscribe((data:any) => 
      {
        console.log(data);
      })
    })

    
  }
}



