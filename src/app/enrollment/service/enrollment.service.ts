import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import {Enrollment} from '../model/Enrollment'
// import { EnvService } from '../../core/env.service';

@Injectable()
export class EnrollmentService {

    api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,//public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getAllDepartment(): Observable<any> {
        return this._httpClient.get<any>(this.api+'departmentgetAll/')
        .pipe(map((res: any) => res));
    }

    getGrades(deptId:Number): Observable<any> {
        return this._httpClient.get<any>(this.api+'gradesByDepId/'+deptId)
        .pipe(map((res: any) => res));
    }

    getStrand(): Observable<any> {
        return this._httpClient.get<any>(this.api+'strandAll/')
        .pipe(map((res: any) => res));
    }

    getCoursesByDeptId(deptId:Number): Observable<any> {
        return this._httpClient.get<any>(this.api+'coursesgetByDeptId/'+deptId)
        .pipe(map((res: any) => res));
    }

    saveEnrolment(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this.api +'enrol',data)
        .pipe(map((res: Enrollment) => res));
    }

    updateEnrolment(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this.api +'updateEnrol',data)
        .pipe(map((res: Enrollment) => res));
    }
    
    getEnrollmentForVerification(){
        return this._httpClient.get<any>(this.api+'enrollgetForverification/')
        .pipe(map((res: any) => res));
    }

    updateStatus(data:Enrollment): Observable<Enrollment> {
        return this._httpClient.post<Enrollment>(this.api +'enrolVerify',data)
        .pipe(map((res: Enrollment) => res));
    }

    getEnrollmentList(page:Number,pageSize:Number,searchField:string){
        console.log('erolList');
        return this._httpClient.get<any>(this.api+'enrollmentinquiry/'+page+'/'+pageSize+'/'+searchField)
        .pipe(map((res: any) => res));
    }
    getPaymentList(page:Number,pageSize:Number,searchField:string){
        console.log('paymentList');
        return this._httpClient.get<any>(this.api+'forapprovalPayment/'+page+'/'+pageSize+'/'+searchField)
        .pipe(map((res: any) => res));
    }
    getEnrollRefNo(refNo:any): Observable<any>{
        console.log('refNo');
        return this._httpClient.get<any>(this.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
    getPaymentByEnrollRefNo(refNo:any): Observable<any>{
        console.log('payment');
        return this._httpClient.get<any>(this.api+'paymentEnrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
}