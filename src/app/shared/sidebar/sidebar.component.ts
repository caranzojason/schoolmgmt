import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
     
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private _cookieService: CookieService
  ) {}

  // End open close
  ngOnInit() {
    let username = this._cookieService.get("username");
    if(username == 'registrar' ){
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    }else{
      this.sidebarnavItems =[{  path: "/myenrollment",  title: 'My Enrollment',  icon: 'mdi mdi-gauge',   class: '', extralink: false, submenu: []  },
                            {  path: "/student/payment",  title: 'Payment',  icon: 'mdi mdi-gauge',   class: '', extralink: false, submenu: []  }
                            ];
    }

  }
}
