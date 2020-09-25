import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse ,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable} from 'rxjs';
import { tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { SpinnerService } from './loader/spinner.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
 
  constructor( public spinnerService: SpinnerService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(map(event => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }    
        return event;
    }, error => {
      
      var respError = error as HttpErrorResponse;
      this.spinnerService.hide();
      console.log(respError);
    }));
  }
}