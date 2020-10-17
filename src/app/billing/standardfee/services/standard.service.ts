import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../../core/env.service';
import { Yearlyfee } from '../../model/Yearlyfee';
import { YearlyfeeDetail } from '../../model/YearlyfeeDetail';

@Injectable()
export class StandardFeeService {
    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getBillingAllFee(): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'getBillingAllFee')
        .pipe(map((res: any) => res));
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

    
    yearlyfee(schoolYearFrom:Number,schoolYearTo:Number,page:Number,pageSize:Number,searchField:string){
        if(searchField == ''){
            return this._httpClient.get<any>(this._env.api+'yearlyfee/'+schoolYearFrom+'/'+schoolYearTo+'/'+page+'/'+pageSize)
            .pipe(map((res: any) => res));    
        }else{
            return this._httpClient.get<any>(this._env.api+'yearlyfee/'+schoolYearFrom+'/'+schoolYearTo+'/'+page+'/'+pageSize+'/'+searchField)
            .pipe(map((res: any) => res));
        }
    }

    getYearlyFeeById(id:Number){
        return this._httpClient.get<any>(this._env.api+'getYearlyFeeById/'+id)
        .pipe(map((res: any) => res)); 
    }

    getYearlyFeeDetailByMastereId(id:Number){
        return this._httpClient.get<any>(this._env.api+'getYearlyFeeDetailByMastereId/'+id)
        .pipe(map((res: any) => res)); 
    }

    saveYearlyFee(data:Yearlyfee): Observable<Yearlyfee> {
        return this._httpClient.post<Yearlyfee>(this._env.api +'saveYearlyFee',data)
        .pipe(map((res: Yearlyfee) => res));
    }

    updateYearlyFee(data:Yearlyfee): Observable<Yearlyfee> {
        return this._httpClient.post<Yearlyfee>(this._env.api +'updateYearlyFee',data)
        .pipe(map((res: Yearlyfee) => res));
    }

    
    updateYearlyFeeDetail(data:Array<YearlyfeeDetail>): Observable<Array<YearlyfeeDetail>> {
        return this._httpClient.post<Array<YearlyfeeDetail>>(this._env.api +'updateYearlyFeeDetail',data)
        .pipe(map((res: Array<YearlyfeeDetail>) => res));
    }

    saveYearlyFeeDetail(data:Array<YearlyfeeDetail>): Observable<Array<YearlyfeeDetail>> {
        return this._httpClient.post<Array<YearlyfeeDetail>>(this._env.api +'saveYearlyFeeDetail',data)
        .pipe(map((res: Array<YearlyfeeDetail>) => res));
    }
}