import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

@Injectable()
export class SpinnerService {
  private visible$ = new BehaviorSubject<boolean>(false);
  public pendingRequests: number = 0;

  show() {
    this.pendingRequests++;
    this.visible$.next(true);
  }

  hide() {
    this.pendingRequests--;
    if(this.pendingRequests<=0){
      this.visible$.next(false);
    }
   
  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable().pipe(share());
  }

  forClose(){
    this.pendingRequests = 0;
    this.visible$.next(false);
  }
}
