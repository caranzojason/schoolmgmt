import { Routes } from '@angular/router';
import { MyEnrollmentComponent } from './myenrollment/myenrollment.component';
import { PaymentComponent } from './payment/payment.component';
import { StudentComponent } from './studentmaster/student.component';

export const StudentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment',
          urls: [
            { title: 'Payment', url: '/student/payment' }
          ]
        }
      },
      {
        path: 'myenrollment',
        component: MyEnrollmentComponent,
        data: {
          title: 'My Enrollment',
          urls: [
            { title: 'My Enrollment', url: '/student/myenrollment' }
          ]
        }
      },
      {
        path: 'studentMaster',
        component: StudentComponent,
        data: {
          title: 'Student Master',
          urls: [
            { title: 'My Enrollment', url: '/student/myenrollment' }
          ]
        }
      },
    ]
  }
];
