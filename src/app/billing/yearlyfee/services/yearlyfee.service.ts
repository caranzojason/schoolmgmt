import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../../core/env.service';

@Injectable()
export class YearlyFeeService {
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
}