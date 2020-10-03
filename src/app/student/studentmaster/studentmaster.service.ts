
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../core/env.service';
import {Student} from './model/Student'

@Injectable()
export class StudentMasterService {

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

    getCoursesByDeptId(deptId:Number): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'coursesgetByDeptId/'+deptId)
        .pipe(map((res: any) => res));
    }

    saveEnrolment(data:Student): Observable<Student> {
        return this._httpClient.post<Student>(this._env.api +'enrol',data)
        .pipe(map((res: Student) => res));
    }

    createStudent(data:Student): Observable<Student> {
        return this._httpClient.post<Student>(this._env.api +'createStudent',data)
        .pipe(map((res: Student) => res));
    }

    updateEnrolment(data:Student): Observable<Student> {
        return this._httpClient.post<Student>(this._env.api +'updateEnrol',data)
        .pipe(map((res: Student) => res));
    }
    
    getEnrollmentForVerification(){
        return this._httpClient.get<any>(this._env.api+'enrollgetForverification')
        .pipe(map((res: any) => res));
    }

    updateStatus(data:Student): Observable<Student> {
        return this._httpClient.post<Student>(this._env.api +'enrolVerify',data)
        .pipe(map((res: Student) => res));
    }


    updateInquiry(data:Student): Observable<Student> {
        return this._httpClient.post<Student>(this._env.api +'updateInquiry',data)
        .pipe(map((res: Student) => res));
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

    //student here
    getStudentList(page:Number,pageSize:Number,searchField:string){
        console.log(searchField)
        if(searchField == ''){
            return this._httpClient.get<any>(this._env.api+'studentlist/'+page+'/'+pageSize)
            .pipe(map((res: any) => res));   
        }else{
            return this._httpClient.get<any>(this._env.api+'studentlist/'+page+'/'+pageSize+'/'+searchField)
            .pipe(map((res: any) => res));
        }
    }
}