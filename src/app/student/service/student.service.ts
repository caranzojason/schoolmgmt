import { HttpClient,HttpHeaders, HttpBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators'
// import { EnvService } from '../../core/env.service';

@Injectable()
export class StudentService {

    api="http://127.0.0.1:8000/api/";

    constructor(private _httpClient: HttpClient,//public _env: EnvService,
         private _uploadHttpClient: HttpClient, private _uploadHandler: HttpBackend ) {
        this._uploadHttpClient = new HttpClient(_uploadHandler);
    }


    getEnrollmentRefNo(refNo:String): Observable<any> {
        return this._httpClient.get<any>(this.api+'enrollmentgetByReff/'+refNo)
        .pipe(map((res: any) => res));
    }

    getPayment(refNo:String): Observable<any> {
        return this._httpClient.get<any>(this.api+'enrollmentgetPayment/'+refNo)
        .pipe(map((res: any) => res));
    }
    
    getEnrollmentByEnrolNo(enrolNo:String): Observable<any> {
        return this._httpClient.get<any>(this.api+'enrollmentgetByEnrolNo/'+enrolNo)
        .pipe(map((res: any) => res));
    }

    uploadFile(inv: String,formData: FormData) {
        return this._uploadHttpClient.post<FormData>(this.api+'enrollmentUpload?enrolId='+inv,formData)
        .pipe(map((event:any) => event));
    }

    makePayment(payment:any): Observable<any> {
        console.log("pay");
        return this._httpClient.post<any>(this.api +'enrollmentMakePayment',payment)
        .pipe(map((res: any) => res));
    }
}