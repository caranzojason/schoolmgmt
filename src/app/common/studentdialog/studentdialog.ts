
import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,Inject,ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Student} from '../../commonmodel/Student'
import { MatTableDataSource } from '@angular/material/table';
import {StudentService} from '../../commonservice/student.service';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
    message: string;
  }


  @Component({
    styleUrls: ['studentdialog.scss'],
    selector: 'student-dialog',
    templateUrl: 'studentdialog.html',
  })
export class StudentDialog {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  studentList:Array<Student>;
  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = [ 'lastname','firstname', 'email','status','actions'];

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
    constructor(private _studentService:StudentService,public dialogRef: MatDialogRef<StudentDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      dialogRef.disableClose = true;
    
      this._studentService.getStudentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
      {
          console.log(data);
        this.studentList = data.Student;
        this.dataSource = new MatTableDataSource( this.studentList);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator.length = data.NoOfRecords;
        this.length = data.NoOfRecords;
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

    
}