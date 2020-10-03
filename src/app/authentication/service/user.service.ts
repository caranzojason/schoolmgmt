import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
import { EnvService } from '../../core/env.service';

@Injectable()
export class UserService {
    // api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }

    login(data:any): Observable<any> {
        return this._httpClient.post<any>(this._env.api +'login',data)
        .pipe(map((res: any) => res));
    }

    getActiveSchoolYear(): Observable<any> {
        return this._httpClient.get<any>(this._env.api +'getActiveSchoolYear')
        .pipe(map((res: any) => res));
    }
}