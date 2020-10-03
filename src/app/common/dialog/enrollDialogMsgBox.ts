
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    message: string;
  }


  @Component({
    styleUrls: ['dailogenrollment.scss'],
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'enrollDialogMsgBox.html',
  })
export class EnrollmentDialogMsBox {
    constructor(
        public dialogRef: MatDialogRef<EnrollmentDialogMsBox>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {dialogRef.disableClose = true;}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}