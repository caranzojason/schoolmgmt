


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {Fee} from '../model/Fee';
import {YearlyFeeService} from './services/yearlyfee.service';

@Component({
  selector: 'app-payment',
  templateUrl: './yearlyfee.component.html',
styleUrls: ['./yearlyfee.scss'],
})
export class YearlyFeeComponent {

  billFormColumns: string[] = ['Fee', 'Amount'];
  displayedColumns: string[] = ['Code', 'Description','Status','Actions'];
  feeList:Array<Fee>;
  dataSource: MatTableDataSource<Fee>;
  dataSourceForm: MatTableDataSource<Fee>;
  public currentTabIndex = 1;
  filter="";
  billingFee:Array<Fee>;
  public deparmentList:any;
  public gradesList:any;
  public trackStandardCourse:any = [{id:0,name:""}];
  public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer
  public department:number;
  public grade:number;
  public strand:number;
  public semester:number;

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _yearlyFeeService:YearlyFeeService) {

    }

    ngAfterViewInit() {
      this._yearlyFeeService.getBillingAllFee().subscribe((data:any) => 
      {
          this.billingFee = data;
          this.dataSourceForm = new MatTableDataSource( this.billingFee);
          console.log(this.billingFee);
      })

      this._yearlyFeeService.getAllDepartment().subscribe((data:any) => 
      {
          this.deparmentList = data;
      })
    }

    onTabChange(event: MatTabChangeEvent) {
      this.currentTabIndex = event.index
      if(event.index == 0){
        this.dataSource = new MatTableDataSource( this.feeList);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }

    public selectDepartment()
    {
        this.schoolsemesterList= [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}];
        if(this.department != 5){//not equal to colege
            this._yearlyFeeService.getGrades(this.department).subscribe((data:any) => 
            {
                this.gradesList = data;
            });
        }else{
            this.gradesList = [{id:0,name:"N/A"}];
        }

        if(this.department == 1 || this.department == 2){ //elem,junio
            this.trackStandardCourse =  [{id:0,name:"N/A"}];
            //asign to default value
            if(this.department == 1){
                this.grade = 1;
            }else{
                this.grade = 9;
            }
            this.gradesList = [{id:0,name:"N/A"}];
            this.schoolsemesterList = [{id:0,name:"N/A"}];
            
        }

        if(this.department == 3 ) //senior
        {
            //set default selected value
            this.grade = 13;
            this.strand = 1;
            this.semester = 1;
            this._yearlyFeeService.getStrand().subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
        if(this.department == 4 || this.department == 5 ){//,colege, master grad
            this.grade = 15;
            this.strand = 1;
            this.semester = 1;
            this._yearlyFeeService.getCoursesByDeptId(this.department).subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
    }
}



