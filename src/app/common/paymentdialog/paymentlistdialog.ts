
import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,Inject,ElementRef} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Student} from '../../commonmodel/Student'
import { MatTableDataSource } from '@angular/material/table';
import {BillingService} from '../../commonservice/billing.service';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie';

export interface DialogData {
    studentId: Number;
    type:0;

  }


  @Component({
    styleUrls: ['paymentlistdialog.scss'],
    selector: 'payment-dialog',
    templateUrl: 'paymentlistdialog.html',
  })
export class PaymentDialog {

  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  paymentList:Array<any>;
  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = [ 'detailNo','amount','actions'];

  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
    constructor(private _billingService:BillingService,private _cookieService:CookieService,public dialogRef: MatDialogRef<PaymentDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      dialogRef.disableClose = true;
      let yearFrom = this._cookieService.get("yearFrom");
      let yearTo = this._cookieService.get("yearTo");

      if(data.type == 0){
        this._billingService.getPaymentList(data.studentId,yearFrom,yearTo).subscribe((data:any) => 
        {
          console.log('payment list');
          console.log(data);
          this.paymentList = data;
          this.dataSource = new MatTableDataSource( this.paymentList);
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.dataSource.paginator.length = data.NoOfRecords;
          // this.length = data.NoOfRecords;
        });
      }else if(data.type == 1){
        this._billingService.getStudentPaidPayment(data.studentId,yearFrom,yearTo).subscribe((data:any) => 
        {
          console.log('payment list');
          console.log(data);
          this.paymentList = data;
          this.dataSource = new MatTableDataSource( this.paymentList);
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.dataSource.paginator.length = data.NoOfRecords;
          // this.length = data.NoOfRecords;
        });
      }

    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.filter = filterValue;
    }

    select(row){
      this.dialogRef.close(row);
    }

    
}