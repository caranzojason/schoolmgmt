


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {FeeDTO} from '../model/FeeDTO';
import {StandardFeeService} from './services/standard.service';
import { Yearlyfee } from '../model/Yearlyfee';
import { VYearlyfee } from '../model/VYearlyfee';
import { YearlyfeeDetail } from '../model/YearlyfeeDetail';
import {EnrollmentDialog} from '../../common/dialog/enrollmentdialog';

@Component({
  selector: 'app-payment',
  templateUrl: './standardfee.component.html',
styleUrls: ['./standardfee.scss'],
})
export class StandardFeeComponent {

  billFormColumns: string[] = ['Fee', 'Amount','actions'];
  displayedColumns: string[] = ['departmentName','gradeName','strandName','courseName','semester','schoolyearfrom','schoolyearto','action'];
  feeList:Array<YearlyfeeDetail>;
  dataSource: MatTableDataSource<VYearlyfee>;
  dataSourceForm: MatTableDataSource<YearlyfeeDetail>;
  public currentTabIndex = 1;
  filter="";
  billingFee:Array<YearlyfeeDetail>=[];
  public deparmentList:any;
  public gradesList:any;
  public trackStandardCourse:any = [{id:0,name:""}];
  public courseList:any = [{id:0,name:""}];
  public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer
  public yearlyFee:Yearlyfee = {"schoolyearfrom":0,"schoolyearto":0,"Id":0,"departmentId":0,"gradeId":0,"strandId":0,"courseId":0,"semester":0};
  public yearlyFeeDetails:YearlyfeeDetail;

  public department:number;
  public grade:number;
  public strand:number;
  public semester:number;
  public schoolyearList:any = [{id:2020,name:"2020"},{id:2021,name:"2021"},{id:2022,name:"2022"}];
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

    constructor(private _yearlyFeeService:StandardFeeService,private _cookieService:CookieService,public dialog: MatDialog,private changeDetectorRefs: ChangeDetectorRef) {
        this.yearFrom = this._cookieService.get("yearFrom");
        this.yearTo = this._cookieService.get("yearTo");
    }

    ngAfterViewInit() {
        this._yearlyFeeService.yearlyfee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,"").subscribe((data:any) => 
        {
            this.dataSource = new MatTableDataSource(data.yearlyFee);
            this.dataSource.sort = this.sort;
            this.length = data.NoOfRecords;
            console.log(data.yearlyFee);
        });

        this._yearlyFeeService.getFeeType().subscribe((data:any) => 
        {
          this.feeType = data;
          console.log(this.feeType);
        });
    }

    init(){
        this._yearlyFeeService.getBillingAllFee().subscribe((data:any) => 
        {
            console.log("bilingallfee");
            console.log(data);
            data.forEach(element => {
              let temp= { Id:0, description:element.Description,amount:0,feeType:element.Id } as YearlyfeeDetail;
                this.billingFee.push(temp);
            });
            console.log(this.billingFee);
            this.dataSourceForm = new MatTableDataSource( this.billingFee);
        })
  
        this._yearlyFeeService.getAllDepartment().subscribe((data:any) => 
        {
            this.deparmentList = data;
            this.selectDepartment();
        })
    }


    onTabChange(event: MatTabChangeEvent) {
      this.currentTabIndex = event.index
      if(event.index == 0){
        this._yearlyFeeService.yearlyfee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,"").subscribe((data:any) => 
        {
            this.dataSource = new MatTableDataSource(data.yearlyFee);
            this.dataSource.sort = this.sort;
            this.length = data.NoOfRecords;
            console.log(data.yearlyFee);
        });
      }
    }

    pageEvents(event: any) {
        this._yearlyFeeService.yearlyfee(this.yearFrom,this.yearTo,event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
        {
            this.dataSource = new MatTableDataSource(data.yearlyFee);
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

    public edit(row)
    {
        this._yearlyFeeService.getYearlyFeeById(row.Id).subscribe((data:any) => 
        {
            this.yearlyFee = data;
            this._yearlyFeeService.getYearlyFeeDetailByMastereId(this.yearlyFee.Id).subscribe((data:any) => 
            {
                this.billingFee = data;
                console.log(this.billingFee);
                this.dataSourceForm = new MatTableDataSource( this.billingFee);
                // this.selectDepartment();
                this.tabGroup.selectedIndex = 1
            });
        });
    }

    removeFee(row){
        console.log(row)
        this.billingFee.forEach(function(item, index, object) {
          console.log(item);
          if(item.description == row.description){
              console.log("true");
            object.splice(index, 1);
          }
        });
        this.dataSourceForm = new MatTableDataSource( this.billingFee);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }

    public selectDepartment()
    {
        console.log(this.yearlyFee);
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
            this.courseList = [{id:0,name:"N/A"}];
            this.yearlyFee.strandId = 0;
            this.yearlyFee.semester = 0;
            this.yearlyFee.courseId = 0;
            
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
            this.courseList = [{id:0,name:"N/A"}];
        }
        if(this.yearlyFee.departmentId == 4 || this.yearlyFee.departmentId == 5 ){//,colege, master grad
            this.yearlyFee.gradeId = 15;
            this.yearlyFee.courseId = 1;
            this.yearlyFee.semester = 1;
            this._yearlyFeeService.getCoursesByDeptId(this.yearlyFee.departmentId).subscribe((data:any) => 
            {
                this.courseList = data;
                this.trackStandardCourse =  [{id:0,name:"N/A"}];
            });
        }
    }

    addNew(){
        let temp= { Id:0, description:"sampleDesc",amount:0 } as YearlyfeeDetail;
        this.billingFee.push(temp);
        this.dataSourceForm = new MatTableDataSource( this.billingFee);
     }

     addNewForm(){
        this.yearlyFee = {"schoolyearfrom":0,"schoolyearto":0,"Id":0,"departmentId":1,"gradeId":0,"strandId":0,"courseId":0,"semester":0};
        this.billingFee = [];
        this.init();
        this.tabGroup.selectedIndex = 1;
     }

     search(){
        this._yearlyFeeService.yearlyfee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,this.filter).subscribe((data:any) => 
        {
            this.dataSource = new MatTableDataSource(data.yearlyFee);
            this.changeDetectorRefs.detectChanges();
        });
      }

      refresh(){
        this.filterInput.nativeElement.value = "";
        this.dataSource.filter = "";
        this.filter = "";
        this._yearlyFeeService.yearlyfee(this.yearFrom,this.yearTo,this.pageIndex,this.pageSize,"").subscribe((data:any) => 
        {
            this.dataSource = new MatTableDataSource(data.yearlyFee);
            this.changeDetectorRefs.detectChanges();
        });
       }


    public save(){

        if(this.yearlyFee.Id == 0){
            this._yearlyFeeService.saveYearlyFee(this.yearlyFee).subscribe((data:any) => 
            {
                this.billingFee.forEach(element => {
                    element.yearlyFeesId = data[0].Id;
                });
                console.log(this.billingFee);
             
                this._yearlyFeeService.saveYearlyFeeDetail(this.billingFee).subscribe((data:any) => 
                {
                    this.setDialog("Successfully Save!");
                    this.yearlyFee = {"schoolyearfrom":0,"schoolyearto":0,"Id":0,"departmentId":0,"gradeId":0,"strandId":0,"courseId":0,"semester":0};
                });
            });
        }else{
            
            this._yearlyFeeService.updateYearlyFee(this.yearlyFee).subscribe((data:any) => 
            {
                this.billingFee.forEach(element => {
                    element.yearlyFeesId = data[0].Id;
                });
                console.log(this.billingFee);
                this._yearlyFeeService.updateYearlyFeeDetail(this.billingFee).subscribe((data:any) => 
                {
                    this.setDialog("Successfully Save!");
                    this.yearlyFee = {"schoolyearfrom":0,"schoolyearto":0,"Id":0,"departmentId":0,"gradeId":0,"strandId":0,"courseId":0,"semester":0};
                });
            });
        }

    }
}



