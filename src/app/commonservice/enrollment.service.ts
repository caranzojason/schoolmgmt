
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../core/env.service';
import {Student} from '../commonmodel/Student'

@Injectable()
export class EnrollmentService {

    constructor(private _httpClient: HttpClient,public _env: EnvService,
        private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
       this._uploadHttpClient = new HttpClient(_uploadHandler);
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
}