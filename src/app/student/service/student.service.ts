import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
// import { EnvService } from '../../core/env.service';

@Injectable()
export class StudentService {
    constructor(private _httpClient: HttpClient,//public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getEnrollmentRefNo(refNo:String): Observable<any> {
        return this._httpClient.get<any>('http://127.0.0.1:8000/api/enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
}