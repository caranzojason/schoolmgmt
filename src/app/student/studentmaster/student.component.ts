

import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentDialog } from '../../common/dialog/enrollmentdialog';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentMasterService } from './studentmaster.service';
import { MatDialog } from '@angular/material/dialog';
import {Student} from './model/Student'
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute,Router} from '@angular/router';

@Component({
    templateUrl: './student.component.html',
    styleUrls: ['./student.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent implements AfterViewInit {
  enrolmentList:Array<Student>;
  subtitle: string;
  displayedColumns: string[] = [ 'lastname','firstname', 'email','status','actions'];
  dataSource: MatTableDataSource<Student>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  public enrollment:Student = {
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

  public deparmentList:any;
  public gradesList:any =  [{id:0,name:""}];
  public trackStandardCourse:any = [{id:0,name:""}];
  public schoolyearList:any = [{id:2020,name:"2020"},{id:2021,name:"2021"},{id:2022,name:"2022"}];
  public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer

  public currentTabIndex = 1 
  @Input() hasPagination = true
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  // MatPaginator Output
  pageEvent: PageEvent;

  // @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

  constructor(private _enrollService:StudentMasterService,public dialog: MatDialog, private _route: ActivatedRoute,private changeDetectorRefs: ChangeDetectorRef) {
    this.subtitle = 'for verification';

  }
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })

    this._enrollService.getStudentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
    {
      this.enrolmentList = data.Student;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
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

  addNew(){
    console.log('add new');
    this.enrollment = {
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

    this.tabGroup.selectedIndex = 1
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
    this.enrollment = row;
    if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
    else{
      const [year, month, day] = this.enrollment.dob.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
      this.enrollment.dob = obj;
    }
 
    this.selectDepartment();
    this.tabGroup.selectedIndex = 1
  }

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index
    if(event.index == 0){
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  setDialog(message){
    const dialogRef = this.dialog.open(EnrollmentDialog, {
        width: '300px',
        data: {  message: message}
      });

      dialogRef.afterClosed().subscribe(result => {
      });
  }

  public save(){

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


    this._enrollService.createStudent(this.enrollment).subscribe((data:any) => 
    {
        console.log(data);
    });
  }


  pageEvents(event: any) {
    this._enrollService.getEnrollmentList(event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
    {
      this.enrolmentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
    });
 }

 search(){
   this._enrollService.getEnrollmentList(0,this.pageSize,this.filter).subscribe((data:any) => 
   {
     this.enrolmentList = data.Enrollment;
     this.dataSource = new MatTableDataSource( this.enrolmentList);
     this.changeDetectorRefs.detectChanges();
   });
 }

 refresh(){
  this.filterInput.nativeElement.value = "";
  this.dataSource.filter = "";
  this.filter = "";
  this._enrollService.getEnrollmentList(0,this.pageSize,"").subscribe((data:any) => 
  {
    this.enrolmentList = data.Enrollment;
    this.length = data.NoOfRecords;
    this.dataSource = new MatTableDataSource( this.enrolmentList);
    this.changeDetectorRefs.detectChanges();
  });
 }


}

