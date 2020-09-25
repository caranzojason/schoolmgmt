export interface Payment{
    id: Number;
    ref_no: string;
    student_name:string;
    enrollment_ref_no:string;
    method:string;
    amount:Number;
    description:string;
    attachment:string;
    approval_remarks:string;
    approval_status:Number;
    approval_by:Number;
    approval_date:any;
    created_at:any;
}