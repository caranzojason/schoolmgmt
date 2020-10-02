


import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {Fee} from './model/Fee';
import {BillingService} from './services/billing.services';

@Component({
  selector: 'app-payment',
  templateUrl: './billing.component.html',
styleUrls: ['./billing.scss'],
})
export class BillingComponent {

  billFormColumns: string[] = ['Date','Fee', 'Credit','Debit','EndingBalance'];
  displayedColumns: string[] = ['Code', 'Description','Status','Actions'];
  feeList:Array<Fee>;
  dataSource: MatTableDataSource<Fee>;
  dataSourceForm: MatTableDataSource<Fee>;
  public currentTabIndex = 1;
  filter="";
  billingFee:Array<Fee>;

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

    constructor(private _billingService:BillingService) {
    
    }

    ngAfterViewInit() {
      this._billingService.getBillingAllFee().subscribe((data:any) => 
      {
          this.billingFee = data;
          this.dataSourceForm = new MatTableDataSource( this.billingFee);
          console.log(this.billingFee);
      })
    }

    onTabChange(event: MatTabChangeEvent) {
      this.currentTabIndex = event.index
      if(event.index == 0){
        this.dataSource = new MatTableDataSource( this.feeList);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }
}



