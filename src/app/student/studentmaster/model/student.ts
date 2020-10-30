export interface Student{
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
}