
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../core/env.service';
import {Student} from '../commonmodel/Student'

@Injectable()
export class BillingService {

    constructor(private _httpClient: HttpClient,public _env: EnvService,
        private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
       this._uploadHttpClient = new HttpClient(_uploadHandler);
   }

    //billing here
    //http://127.0.0.1:8000/api/getStudentForPayment/1132/2020/2021
    getPaymentList(studentId:Number,yearFrom:any,yearTo:any){
        return this._httpClient.get<any>(this._env.api+'getStudentForPayment/'+studentId+'/'+yearFrom+'/'+yearTo)
        .pipe(map((res: any) => res));   
    }

    getStudentPaidPayment($studentId:Number,$yearFrom:any,$yearTo:any){
        return this._httpClient.get<any>(this._env.api+'getStudentPaidPayment/'+$studentId+'/'+$yearFrom+'/'+$yearTo)
        .pipe(map((res: any) => res));
    }
}