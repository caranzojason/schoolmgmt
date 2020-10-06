import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../core/env.service';
import { Studentfee } from '../model/Studentfee';
import { StudentfeeDetails } from '../model/StudentfeeDetails';

@Injectable()
export class BillingService {
    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getBillingAllFee(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'getBillingAllFee')
        .pipe(map((res: any) => res));
    } 

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

    getAllDepartment(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'departmentgetAll')
        .pipe(map((res: any) => res));
    }

    getYearlyFeeAccordingtoStudent(departmentId:Number,gradeId:Number,strandId:Number,semester:Number,schoolyearfrom:Number,schoolyearto:Number){
        return this._httpClient.get<any>(this._env.api+'getYearlyFeeAccordingtoStudent/'+departmentId+'/'+gradeId+'/'+strandId+'/'+semester+'/'+schoolyearfrom+'/'+schoolyearto)
        .pipe(map((res: any) => res));
    }

    saveStudentFee(data:Studentfee): Observable<Studentfee> {
        return this._httpClient.post<Studentfee>(this._env.api +'saveStudentFee',data)
        .pipe(map((res: Studentfee) => res));
    }

    saveStudentFeeDetail(data:Array<StudentfeeDetails>): Observable<any> {
        return this._httpClient.post<any>(this._env.api +'saveStudentFeeDetail',data)
        .pipe(map((res: any) => res));
    }
}