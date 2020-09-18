import { Component, AfterViewInit } from '@angular/core';
import {Enrollment} from './model/Enrollment';
import {EnrollmentService} from './service/enrollment.service';
@Component({
    selector: 'app-enroll',
    styleUrls: ['./enrollment.scss'],
  templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent implements AfterViewInit {

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
        "fathercontact": 527,
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

    constructor(private _enrollService:EnrollmentService) {
        this._enrollService.getAllDepartment().subscribe((data:any) => 
        {
            console.log(data);
            this.deparmentList = data;
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
        console.log(this.enrollment);
        this._enrollService.saveEnrolment(this.enrollment).subscribe((data:any) => 
        {
            console.log(data);
        });
    }
}
