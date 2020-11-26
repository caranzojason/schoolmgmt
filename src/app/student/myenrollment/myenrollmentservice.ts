
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../core/env.service';


@Injectable()
export class MyEnrollmentService {


    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getEnrollmentByRefNo(refNo:string): Observable<any> {
        return this._httpClient.get<any>(this._env.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
}