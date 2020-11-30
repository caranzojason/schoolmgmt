
import { Component, ViewChild,Inject,ElementRef,ChangeDetectorRef} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Enrollment} from '../../commonmodel/Enrollment'
import { MatTableDataSource } from '@angular/material/table';
import {StudentService} from '../../commonservice/student.service';
import {EnrollmentService} from '../../commonservice/enrollment.service';
import { MatSort } from '@angular/material/sort';


export interface DialogData {
    message: string;

  }

  @Component({
    styleUrls: ['./enrollmentdialog.scss'],
    selector: 'enrol-dialog',
    templateUrl: 'enrollmentdialog.html',
  })
export class EnrollmentListDialog {
  schoolyearfrom:any;
  schoolyearto:any;
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  studentList:Array<Enrollment>;
  dataSource: MatTableDataSource<Enrollment>;
  displayedColumns: string[] = [ 'lastname','firstname', 'email','status','actions'];
  public schoolyearList:any = [
    {id:2020,name:'2020'},
    {id:2021,name:'2021'},
    {id:2022,name:'2022'}
  ];

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
    constructor(private _studentService:EnrollmentService,public dialogRef: MatDialogRef<EnrollmentListDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,private changeDetectorRefs: ChangeDetectorRef) {
      dialogRef.disableClose = true;

      // this._enrollService.getEnrollmentList(0,this.pageSize,this.filter).subscribe((data:any) => 
      // {
      //   this.enrolmentList = data.Enrollment;
      //   this.dataSource = new MatTableDataSource( this.enrolmentList);
      //   this.changeDetectorRefs.detectChanges();
      // });

      this._studentService.getEnrollmentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
      {
        console.log("enrol List");
        console.log(data);
        this.studentList = data.Enrollment;
        this.dataSource = new MatTableDataSource( this.studentList);
        this.dataSource.sort = this.sort;
        this.length = data.NoOfRecords;

        this.changeDetectorRefs.detectChanges();

      });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }

    select(row){
      this.dialogRef.close(row);
    }

    pageEvents(event: any) {
      this._studentService.getEnrollmentList(event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
      {
        this.studentList = data.Enrollment;
        this.dataSource = new MatTableDataSource( this.studentList);
      });
    }

   search(){
    this._studentService.getEnrollmentList(0,this.pageSize,this.filter).subscribe((data:any) => 
    {
      this.studentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.studentList);
      this.changeDetectorRefs.detectChanges();
    });
  }

  refresh(){
    this.filterInput.nativeElement.value = "";
    this.dataSource.filter = "";
    this.filter = "";
    this._studentService.getEnrollmentList(0,this.pageSize,"").subscribe((data:any) => 
    {
      this.studentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.studentList);
      this.changeDetectorRefs.detectChanges();
    });
   }
    
}