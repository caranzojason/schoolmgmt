import { Component, AfterViewInit } from '@angular/core';
import {Enrollment} from './model/Enrollment';
import {EnrollmentService} from './service/enrollment.service';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
import { EnrollmentDialogMsBox } from '../common/dialog/enrollDialogMsgBox';
@Component({
    selector: 'app-enroll',
    styleUrls: ['./enrollment.scss'],
  templateUrl: './enrollmenthighschool.component.html'
})
export class EnrollmentHighSchoolComponent implements AfterViewInit {

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
        "department": 0,
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
        "fathercontact": "",
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

    constructor(private _enrollService:EnrollmentService,public dialog: MatDialog) {
        this._enrollService.getAllDepartment().subscribe((data:any) => 
        {
            this.deparmentList = data;
            this.selectDepartment();
        })

    }
    ngAfterViewInit() {}

    public selectDepartment()
    {
        this.enrollment.department = 2;
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
            this._enrollService.getCourses().subscribe((data:any) => 
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

    setDialog(message){
        const dialogRef = this.dialog.open(EnrollmentDialog, {
            width: '300px',
            data: {  message: message}
          });
  
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }
    setDialogBox(message){
        const dialogRef = this.dialog.open(EnrollmentDialogMsBox, {
            width: '300px',
            data: {  message: message}
          });
  
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    }

    public enrol(){
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

      
        if(this.enrollment.learning_modality == ''){
            this.setDialog("Learnig modality is required!");
            return;
        }

        if(this.enrollment.schoolyearfrom == 0){
            this.setDialog("School Year from is required!");
            return;
        }

        if(this.enrollment.schoolyearto == 0){
            this.setDialog("School Year To is required!");
            return;
        }

        this._enrollService.saveEnrolment(this.enrollment).subscribe((data:any) => 
        {
     
            this.setDialogBox("User Name:"+ " " + data.ref_no + '\n'+"Password: "+ " " + data.password );
 
        });
    }

    public cancel(){
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
          "department": 0,
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
          "fathercontact": "",
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
          "schoolyearfrom": "",
          "schoolyearto": "",
          "semester": 0
      }
    }
}
