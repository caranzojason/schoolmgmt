import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import {Enrollment} from '../model/Enrollment'
import { EnvService } from '../../core/env.service';

@Injectable()
export class EnrollmentService {

    // api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getAllDepartment(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'departmentgetAll')
        .pipe(map((res: any) => res));
    }

    getGrades(deptId:Number): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'gradesByDepId/'+deptId)
        .pipe(map((res: any) => res));
    }

    getStrand(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'strandAll')
        .pipe(map((res: any) => res));
    }

    getCourses(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'coursesgetAll')
        .pipe(map((res: any) => res));
    }

    getCoursesByDeptId(deptId:Number): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'coursesgetByDeptId/'+deptId)
        .pipe(map((res: any) => res));
    }

    saveEnrolment(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this._env.api +'enrol',data)
        .pipe(map((res: Enrollment) => res));
    }

    updateEnrolment(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this._env.api +'updateEnrol',data)
        .pipe(map((res: Enrollment) => res));
    }
    
    getEnrollmentForVerification(){
        return this._httpClient.get<any>(this._env.api+'enrollgetForverification')
        .pipe(map((res: any) => res));
    }

    updateStatus(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this._env.api +'enrolVerify',data)
        .pipe(map((res: Enrollment) => res));
    }

    enrolDisapprove(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this._env.api +'enrolDisapprove',data)
        .pipe(map((res: Enrollment) => res));
    }

    

    updateInquiry(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this._env.api +'updateInquiry',data)
        .pipe(map((res: Enrollment) => res));
    }
    

    getEnrollmentList(page:Number,pageSize:Number,searchField:string){
        console.log(searchField)
        if(searchField == ''){
            return this._httpClient.get<any>(this._env.api+'enrollmentinquiry/'+page+'/'+pageSize)
            .pipe(map((res: any) => res));   
        }else{
            return this._httpClient.get<any>(this._env.api+'enrollmentinquiry/'+page+'/'+pageSize+'/'+searchField)
            .pipe(map((res: any) => res));
        }

    }
    getPaymentList(page:Number,pageSize:Number,searchField:string){
        console.log(searchField)
        if(searchField == ''){
            return this._httpClient.get<any>(this._env.api+'forapprovalPayment/'+page+'/'+pageSize)
            .pipe(map((res: any) => res));
        }else{
            return this._httpClient.get<any>(this._env.api+'forapprovalPayment/'+page+'/'+pageSize+'/'+searchField)
            .pipe(map((res: any) => res));
        }

    }

    getInquiryPaymentList(page:Number,pageSize:Number,searchField:string){
        console.log(searchField)
        if(searchField == ''){
            return this._httpClient.get<any>(this._env.api+'inquiryPayment/'+page+'/'+pageSize)
            .pipe(map((res: any) => res));
        }else{
            return this._httpClient.get<any>(this._env.api+'inquiryPayment/'+page+'/'+pageSize+'/'+searchField)
            .pipe(map((res: any) => res));
        }

    }

    approvePayment(refNo){
        return this._httpClient.get<any>(this._env.api+'approvePayment/'+refNo)
        .pipe(map((res: any) => res));
    }

    disapprovePayment(refNo){
        return this._httpClient.get<any>(this._env.api+'disapprovePayment/'+refNo)
        .pipe(map((res: any) => res));
    }
    
    getEnrollRefNo(refNo:any): Observable<any>{
        return this._httpClient.get<any>(this._env.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
    getPaymentByEnrollRefNo(refNo:any): Observable<any>{
        return this._httpClient.get<any>(this._env.api+'paymentEnrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
    getPayment(refNo:String): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'enrollmentgetPayment/'+refNo)
        .pipe(map((res: any) => res));
    }

    getEnrollmentRefNo(refNo:String): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
    
    getEnrollmentByEnrolNo(enrolNo:String): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'enrollmentgetByEnrolNo/'+enrolNo)
        .pipe(map((res: any) => res));
    }

    uploadFile(inv: String,formData: FormData) {
        return this._uploadHttpClient.post<FormData>(this._env.api+'enrollmentUpload?enrolId='+inv,formData)
        .pipe(map((event:any) => event));
    }

    makePayment(payment:any): Observable<any> {
        console.log("pay");
        return this._httpClient.post<any>(this._env.api +'enrollmentMakePayment',payment)
        .pipe(map((res: any) => res));
    }

}