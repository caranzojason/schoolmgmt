


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {FeeDTO} from '../model/FeeDTO';
import {YearlyFeeService} from './services/yearlyfee.service';
import { Yearlyfee } from '../model/Yearlyfee';
import { YearlyfeeDetail } from '../model/YearlyfeeDetail';


@Component({
  selector: 'app-payment',
  templateUrl: './yearlyfee.component.html',
styleUrls: ['./yearlyfee.scss'],
})
export class YearlyFeeComponent {

  billFormColumns: string[] = ['Fee', 'Amount'];
  displayedColumns: string[] = ['Description','Status','Actions'];
  feeList:Array<YearlyfeeDetail>;
  dataSource: MatTableDataSource<YearlyfeeDetail>;
  dataSourceForm: MatTableDataSource<YearlyfeeDetail>;
  public currentTabIndex = 1;
  filter="";
  billingFee:Array<YearlyfeeDetail>=[];
  public deparmentList:any;
  public gradesList:any;
  public trackStandardCourse:any = [{id:0,name:""}];
  public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer
  public yearlyFee:Yearlyfee = {"schoolyearfrom":0,"schoolyearto":0,"Id":0,"departmentId":0,"gradeId":0,"strandId":0,"semester":0};
  public yearlyFeeDetails:YearlyfeeDetail;

  public department:number;
  public grade:number;
  public strand:number;
  public semester:number;
  public schoolyearList:any = [{id:2020,name:"2020"},{id:2021,name:"2021"},{id:2022,name:"2022"}];

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _yearlyFeeService:YearlyFeeService) {

    }

    ngAfterViewInit() {
      this._yearlyFeeService.getBillingAllFee().subscribe((data:any) => 
      {
          data.forEach(element => {
            let temp= { Id:0, description:element.Description,amount:0 } as YearlyfeeDetail;
              this.billingFee.push(temp);
          });
         // this.billingFee = data;
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
        if(this.yearlyFee.departmentId != 5){//not equal to colege
            this._yearlyFeeService.getGrades(this.yearlyFee.departmentId).subscribe((data:any) => 
            {
                this.gradesList = data;
            });
        }else{
            this.gradesList = [{id:0,name:"N/A"}];
        }

        if(this.yearlyFee.departmentId == 1 || this.yearlyFee.departmentId == 2){ //elem,junio
            this.trackStandardCourse =  [{id:0,name:"N/A"}];
            //asign to default value
            if(this.yearlyFee.departmentId == 1){
                this.yearlyFee.gradeId = 1;
            }else{
                this.yearlyFee.gradeId = 9;
            }
            this.gradesList = [{id:0,name:"N/A"}];
            this.schoolsemesterList = [{id:0,name:"N/A"}];
            
        }

        if(this.yearlyFee.departmentId == 3 ) //senior
        {
            //set default selected value
            this.yearlyFee.gradeId = 13;
            this.yearlyFee.strandId = 1;
            this.yearlyFee.semester = 1;
            this._yearlyFeeService.getStrand().subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
        if(this.yearlyFee.departmentId == 4 || this.yearlyFee.departmentId == 5 ){//,colege, master grad
            this.yearlyFee.gradeId = 15;
            this.yearlyFee.strandId = 1;
            this.yearlyFee.semester = 1;
            this._yearlyFeeService.getCoursesByDeptId(this.yearlyFee.departmentId).subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
    }

    addNew(){
        console.log("add new");
        let temp= { Id:0, description:"sampleDesc",amount:0 } as YearlyfeeDetail;
        this.billingFee.push(temp);
        this.dataSourceForm = new MatTableDataSource( this.billingFee);
        // ELEMENT_DATA.push(this.employee)
        // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        // this.employee = {
        //   id :"",
        //   name :""
        // };   /// This could refactor
     }


    public save(){


        this._yearlyFeeService.saveYearlyFee(this.yearlyFee).subscribe((data:any) => 
        {
            this.billingFee.forEach(element => {
                element.yearlyFeesId = data[0].Id;
            });
            console.log(this.billingFee);
            this._yearlyFeeService.saveYearlyFeeDetail(this.billingFee).subscribe((data:any) => 
            {
                console.log(data);
            });

        });

        
        // console.log(this.yearlyFee);
        // console.log(this.dataSourceForm.data);
        // console.log(this.billingFee);
    }
}



