import { Component, AfterViewInit } from '@angular/core';
import {Enrollment} from '../enrollment/model/Enrollment';
import {EnrollmentService} from '../enrollment/service/enrollment.service';
import {StarterService} from '../starter/service/starter.service';
import { CookieService } from 'ngx-cookie';

@Component({
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.scss'],
})
export class StarterComponent implements AfterViewInit {
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
    "fathercontact": 0,
    "fatherplace": "",
    "mothername": "",
    "motherocc": "",
    "mothercontact": 0,
    "motherplace": "",
    "guardian_name": "",
    "guardian_contactno": 0,
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
    "approved_by": 0,
    "cancelled_by": 0,
    "updated_by": "",
    "remarks": "",
    "created_at": "",
    "school_year": 0
}

public deparmentList:any;
public gradesList:any =  [{id:0,name:""}];
public trackStandardCourse:any = [{id:0,name:""}];

constructor(private _enrollService:EnrollmentService,private _starterService:StarterService, private _cookieService:CookieService) {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })
    this.subtitle = 'My Enrolment Status: ';
    let refNo = this._cookieService.get("username");
    this._starterService.getEnrollmentByRefNo(refNo).subscribe((data:any) => 
    {
        console.log(data);
        this.enrollment = data;

        const [year, month, day] = this.enrollment.dob.split('-');
        const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
        this.enrollment.dob = obj;
        if(this.enrollment.status == "" || this.enrollment.status == undefined ){
            this.status  = "FOR VERIFICATION"

        }else if(this.enrollment.status == "verified"){
            this.status  = "Verified"
            this.message = "Please proceed now to payment click here"
        }else if(this.enrollment.status == "paid"){
            this.status  = "FOR APPROVAL"
            this.message = "Your payment is now for approva/process."
        }else if(this.enrollment.status == "approved"){
            this.status  = "APPROVED"
            this.message = "Your payment is recieved and approved you are now succesfully enrolled!"
        }
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
    }

    if(this.enrollment.department == 3 ) //senior
    {
        this._enrollService.getStrand().subscribe((data:any) => 
        {
            this.trackStandardCourse = data;
        });
    }
    if(this.enrollment.department == 4 || this.enrollment.department == 5 ){//,colege
        this._enrollService.getCoursesByDeptId(this.enrollment.department).subscribe((data:any) => 
        {
            this.trackStandardCourse = data;
        });
    }
}

public enrol(){
    this._enrollService.saveEnrolment(this.enrollment).subscribe((data:any) => 
    {
        console.log(data);
    });
}
}
