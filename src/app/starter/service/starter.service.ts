
import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class StarterService {

    api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,//public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    getEnrollmentByRefNo(refNo:string): Observable<any> {
        return this._httpClient.get<any>(this.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }
}