

export interface Enrollment{
    id: Number;
    ref_no: string;
    type:string;
    studentno:string;
    firstname:string;
    middlename:string;
    lastname:string;
    email:string;
    grade:Number;
    department:Number;
    strand:Number;
    courseId:Number;
    dob:any;
    place_of_birth:string;
    contactno:string;
    address:string;
    nationality
    age:Number;
    gender:string;
    religion:string;
    fathername:string;
    fatherocc:string;
    fathercontact:string;
    fatherplace:string;
    mothername:string;
    motherocc:string;
    mothercontact:string;
    motherplace:string;
    guardian_name:string;
    guardian_contactno:string;
    guardian_relation:string;
    last_school_attended:string;
    last_school_grade_level:string;
    last_school_date_of_attendance:string;
    last_school_address:string;
    last_school_year:string;
    indigenous:string;
    learning_modality:string;
    status:string;
    validated_by:string;
    approved_by:string;
    cancelled_by:Number;
    updated_by:string;
    remarks:string;
    created_at:string;
    school_year:Number;
    schoolyearfrom: any,
    schoolyearto: any,
    semester: Number,
    subjectToEnroll:any,
}
/*
"id": 1,
"ref_no": "SJCC-ENR-00001xxxx",
"type": null,
"studentno": "109629090098",
"firstname": "testxxx",
"middlename": "Veleña",
"lastname": "Corral",
"email": "gracevcorral@yahoo.com",
"grade": "13",
"department": "3",
"strand": "2",
"dob": "2004-01-17",
"place_of_birth": "Cavite City",
"contactno": "5277617",
"address": "749 Calpo St., san Antonio, Cavite City",
"nationality": "Fil",
"age": 16,
"gender": "male",
"religion": "Catholic",
"fathername": "Dennis Earl Corral",
"fatherocc": "Car rental Owner",
"fathercontact": 527,
"fatherplace": "San Antonio Cavite City",
"mothername": "Ma. Gracia V. Corral",
"motherocc": "Teacher",
"mothercontact": 2147483647,
"motherplace": "Cavite City",
"guardian_name": "Emma Corral",
"guardian_contactno": 527,
"guardian_relation": "Nephew",
"last_school_attended": "SPNHS",
"last_school_grade_level": "10",
"last_school_date_of_attendance": null,
"last_school_address": "Sangley Pt.,Cavite City",
"last_school_year": "2019-2020",
"indigenous": "no",
"learning_modality": "blend_mode",
"status": "approved",
"validated_by": "",
"approved_by": "0",
"cancelled_by": "6",
"updated_by": "",
"remarks": "Click this link or copy it to your browser to view your the breakdown of fees:\nhttp://sjcc.edu.ph/fees/shs.JPG\n\nIn order to enroll you must pay for the first month with the amount of Php 543.75.\nIf you come to school, your appointment date and time is June 10, 2020 1:00 PM.",
"created_at": "2020-06-10 08:50:50",
"school_year": 0
*/