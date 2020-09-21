import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router} from '@angular/router';

import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  public username = "";

  constructor(private modalService: NgbModal, private _cookieService: CookieService,private _router: Router) {

    let username = this._cookieService.get("username");
    this.username = username;
  }

  ngAfterViewInit() {}

  logout()
  {
    this._cookieService.removeAll();
    this._router.navigate(['/authentication/login'],{ replaceUrl: true });
  }
}
