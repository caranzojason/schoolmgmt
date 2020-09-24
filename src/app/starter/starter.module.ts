import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarterComponent } from './starter.component';
import {EnrollmentService} from '../enrollment/service/enrollment.service';
import {StarterService} from './service/starter.service'
import {MatDialogModule} from '@angular/material/dialog';
import { EnrollmentDialog } from '../common/dialog/enrollmentdialog';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'My Enrollment',
      urls: [
        { title: 'My Enrollment', url: '/myenrollment' }
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),NgbModule, MatDialogModule,],
  declarations: [StarterComponent,EnrollmentDialog],
  providers: [
    EnrollmentService,StarterService
  ],
  entryComponents: [EnrollmentDialog]
})
export class StarterModule {}
