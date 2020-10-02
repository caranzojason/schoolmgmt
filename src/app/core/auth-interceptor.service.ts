import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse ,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable} from 'rxjs';
import { tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { SpinnerService } from './loader/spinner.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
 
  constructor( public spinnerService: SpinnerService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      (err: any) => {
        this.spinnerService.hide();
        console.log('onInterceptor handle ', err);


      }
    );
  }
}