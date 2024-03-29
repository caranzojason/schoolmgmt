import { Component, AfterViewInit } from '@angular/core';
import {Enrollment} from '../../enrollment/model/Enrollment';
import {EnrollmentService} from '../../enrollment/service/enrollment.service';
import {MyEnrollmentService} from './myenrollmentservice';
import { CookieService } from 'ngx-cookie';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../../common/dialog/enrollmentdialog';
import { TermsAndConditionDialog } from 'src/app/common/dialog/termscondition';

@Component({
  templateUrl: './myenrollment.component.html',
  styleUrls: ['./myenrollment.scss'],
})
export class MyEnrollmentComponent implements AfterViewInit {
  subtitle: string;
  status: string;
  message: string;

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
    "schoolyearfrom": "",
    "schoolyearto": "",
    "semester": 0,
    "subjectToEnroll":""
}

public deparmentList:any;
public gradesList:any =  [{id:0,name:""}];
public trackStandardCourse:any = [{id:0,name:""}];
maxDate ={year: new Date().getUTCFullYear()+30,month: 12, day: 31}
minDate ={year: new Date().getUTCFullYear()-90,month: 12, day: 31}
startDate={year: new Date().getUTCFullYear()-15,month: new Date().getUTCMonth(), day: 1}
// myRemarks = "Model example A — For example, according \n to Frederick Douglass, " + 
//             "the song O Canaan, Sweet Canaan spoke of slaves’ longing for heaven, " +
//             " but it also expressed their desire to escape to the North. Careful listeners heard " +
//             "this second meaning in the following lyrics: “I don’t expect to stay / Much longer here. / Run to Jesus, shun the danger. / I don’t expect to stay.”"
constructor(private _enrollService:EnrollmentService,private _starterService:MyEnrollmentService, 
            private _cookieService:CookieService,public dialog: MatDialog) {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this.subtitle = 'My Enrolment Status: ';
    let refNo = this._cookieService.get("username");
    this._starterService.getEnrollmentByRefNo(refNo).subscribe((data:any) => 
    {
        this.enrollment = data;
        this.enrollment.schoolyearfrom = Number(this.enrollment.schoolyearfrom);
        this.enrollment.schoolyearto = Number(this.enrollment.schoolyearto);
        this.enrollment.strand = Number(this.enrollment.strand);
        this.enrollment.grade = Number(this.enrollment.grade);
        const [year, month, day] = this.enrollment.dob.split('-');
        const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
        this.enrollment.dob = obj;
        if(this.enrollment.status == "pending" || this.enrollment.status == undefined ){
            this.status  = "pending"
            this.message = "For Verification"
        }else if(this.enrollment.status == "ForPayment"){
            this.status  = "ForPayment"
            this.message = "Verified and is ready for payment."
        }else if(this.enrollment.status == "PaymentForApproval"){
            this.status  = "PaymentForApproval"
            this.message = "Your payment is now for approva/process."
        }else if(this.enrollment.status == "approved"){
            this.status  = "APPROVED"
            this.message = "Your payment is recieved and approved you are now succesfully enrolled!"
        }else if(this.enrollment.status == "cancelled"){
            this.status  = "CANCELLED"
            this.message = "We regret to inform you that your enrollment was cancell!"
        }
        this.selectDepartment();
    })
}
ngAfterViewInit() {}

public selectDepartment()
{

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
    }

    if(this.enrollment.department == 3 ) //senior
    {
        //set default selected value
        // this.enrollment.grade = 13;
        // this.enrollment.strand = 1;
        this._enrollService.getStrand().subscribe((data:any) => 
        {
            this.trackStandardCourse = data;
        });
    }
    if(this.enrollment.department == 4 || this.enrollment.department == 5 ){//,colege
        // this.enrollment.grade = 15;
        // this.enrollment.strand = 1;
        this._enrollService.getCoursesByDeptId(this.enrollment.department).subscribe((data:any) => 
        {
            this.trackStandardCourse = data;
        });
    }
}

myTermsAndCondition()
{
    this.setDialogTermsCondition();
}
setDialogTermsCondition(){
    const dialogRef = this.dialog.open(TermsAndConditionDialog, {
        width: '1000px',
        data: {  message: ""}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

setDialog(message){
    const dialogRef = this.dialog.open(EnrollmentDialog, {
        width: '300px',
        data: {  message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
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
        this.setDialog("Learnig modality is required!");
        return;
    }

    this._enrollService.updateEnrolment(this.enrollment).subscribe((data:any) => 
    {
        this.setDialog("Successfully Updated!");
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
        "semester": 0,
        "subjectToEnroll":""
    }
  }
}
