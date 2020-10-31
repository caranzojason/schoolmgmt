import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import {EnrollReport} from '../model/EnrollReportDTO'
import { EnvService } from '../../core/env.service';

@Injectable()
export class ReportService {

    // api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getAllDepartment(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'departmentgetAll')
        .pipe(map((res: any) => res));
    }

    getAllGrades(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'gradegetAll')
        .pipe(map((res: any) => res));
    }

    getAllStrand(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'strandAll')
        .pipe(map((res: any) => res));
    }

    getAllCourses(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'coursesgetAll')
        .pipe(map((res: any) => res));
    }
    getEnrollmentForVerification(){
        return this._httpClient.get<any>(this._env.api+'gradegetAll')
        .pipe(map((res: any) => res));
    }
    getEnrollmentReport(data:EnrollReport): Observable<EnrollReport> {
        return this._httpClient.post<EnrollReport>(this._env.api +'getEnrolment',data)
        .pipe(map((res: EnrollReport) => res));
    }
    getReportsCountElementary(from:Number,to:Number){
            return this._httpClient.get<any>(this._env.api+'getEnrolElementary/'+from+'/'+to)
            .pipe(map((res: any) => res));
    }
    getReportsCountJuniorHigh(from:Number,to:Number){
        return this._httpClient.get<any>(this._env.api+'getEnroljuniorhigh/'+from+'/'+to)
        .pipe(map((res: any) => res));
    }
    getReportsCountSeniorHigh(from:Number,to:Number){
        return this._httpClient.get<any>(this._env.api+'getEnrolsenior/'+from+'/'+to)
        .pipe(map((res: any) => res));
    }
    getReportsCountCollege(from:Number,to:Number){
        return this._httpClient.get<any>(this._env.api+'getEnrolcollege/'+from+'/'+to)
        .pipe(map((res: any) => res));
    }
}