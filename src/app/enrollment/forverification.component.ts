import { Component, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Enrollment } from './model/Enrollment';
import {EnrollmentService} from './service/enrollment.service';
import {ThemePalette} from '@angular/material/core';
import { MatTabChangeEvent,MatTabGroup } from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  templateUrl: './forverification.component.html',
  styleUrls: ['./forverification.scss'],
})

export class ForVerificationComponent implements AfterViewInit {
  enrolmentList:Array<Enrollment>;
  subtitle: string;
  displayedColumns: string[] = ['ref_no', 'lastname', 'firstname', 'email','status','actions'];
  dataSource: MatTableDataSource<Enrollment>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
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

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

  constructor(private _enrollService:EnrollmentService,public dialog: MatDialog) {
    this.subtitle = 'for verification';

  }
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this._enrollService.getEnrollmentForVerification().subscribe((data:Array<Enrollment>) => 
    {
        this.enrolmentList = data;
        console.log(this.enrolmentList);
        this.dataSource = new MatTableDataSource( this.enrolmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
  generatePdf(){
    console.log('pdf')
    const documentDefinition = { content:this.dataSource};
    pdfMake.createPdf(documentDefinition).open();
   }
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.enrollment.schoolyearfrom = Number(this.enrollment.schoolyearfrom);
    this.enrollment.schoolyearto = Number(this.enrollment.schoolyearto);
    console.log(this.enrollment);
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
        this.setDialog("Learning Modality is required!");
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

    this.enrollment.approved_by = "registrar"
    this._enrollService.updateStatus(this.enrollment).subscribe((data:any) => 
    {
      this.refresh();
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

  public disaprrove(){
    var scope = this;
    this._enrollService.enrolDisapprove(this.enrollment).subscribe((data:any) => 
    {
      this.refresh();
        const dialogRef = this.dialog.open(EnrollmentDialog, {
          width: '300px',
          data: {  message: "Successfully Cancelled!"}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          scope.tabGroup.selectedIndex = 0;
          console.log(scope.tabGroup.selectedIndex );
        });
    });
  }
  
 refresh(){
  this._enrollService.getEnrollmentForVerification().subscribe((data:Array<Enrollment>) => 
  {
      this.enrolmentList = data;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
 }

}
