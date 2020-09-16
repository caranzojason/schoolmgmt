import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { StudentRoutes } from './student.routing';
import { FormsModule } from '@angular/forms';
import {StudentService} from './service/student.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentRoutes),
    NgbModule,
    FormsModule
  ],
  declarations: [
   PaymentComponent
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule {}
