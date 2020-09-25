import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { StudentRoutes } from './student.routing';
import { FormsModule } from '@angular/forms';
import {StudentService} from './service/student.service';
import { MyEnrollmentComponent } from './myenrollment/myenrollment.component';
import { MyEnrollmentService } from './myenrollment/myenrollmentservice';
import {EnrollmentService} from '../enrollment/service/enrollment.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentRoutes),
    NgbModule,
    FormsModule,
   // MatDialogModule
  ],
  declarations: [
   PaymentComponent,
   MyEnrollmentComponent
  //  EnrollmentDialog
  ],
  providers: [
    StudentService,
    EnrollmentService,
    MyEnrollmentService
  ],
 // entryComponents: [EnrollmentDialog]
})
export class StudentModule {}
