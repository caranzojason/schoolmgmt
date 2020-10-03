


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {Fee} from './model/Fee';
import {BillingService} from './services/billing.services';
import { StudentDialog } from '../common/studentdialog/studentdialog';
import {Student} from '../commonmodel/Student';

@Component({
  selector: 'app-payment',
  templateUrl: './billing.component.html',
styleUrls: ['./billing.scss'],
})
export class BillingComponent {
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

  billFormColumns: string[] = ['Date','Fee', 'Debit','Credit','EndingBalance'];
  displayedColumns: string[] = ['Code', 'Description','Status','Actions'];
  feeList:Array<Fee>;
  dataSource: MatTableDataSource<Fee>;
  dataSourceForm: MatTableDataSource<Fee>;
  public currentTabIndex = 1;
  filter="";
  billingFee:Array<Fee>;

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _billingService:BillingService,public dialog: MatDialog, ) {
    
    }

    ngAfterViewInit() {
      this._billingService.getBillingAllFee().subscribe((data:any) => 
      {
          this.billingFee = data;
          this.dataSourceForm = new MatTableDataSource( this.billingFee);
          console.log(this.billingFee);
      })
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
            
              console.log(data);
          })

      });
  }

  getStudentList(){
    this.setStudentDialog();
  }
}



