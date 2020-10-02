import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import {Fee} from '../model/Fee';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.scss'],
})
export class FeeComponent {

  displayedColumns: string[] = ['Code', 'Description','Status','Actions'];
  feeList:Array<Fee>;
  dataSource: MatTableDataSource<Fee>;
  public currentTabIndex = 1;
  filter="";

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;
    constructor() {
    }

    ngAfterViewInit() {


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
      // if (this.dataSource.paginator) {
      //   this.dataSource.paginator.firstPage();
      // }
    }
}


