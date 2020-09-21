
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    message: string;
  }


  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'enrollmentdialog.html',
  })
export class EnrollmentDialog {
    constructor(
        public dialogRef: MatDialogRef<EnrollmentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}