import { Routes } from '@angular/router';

import { PaymentComponent } from './payment/payment.component';

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
      }
    ]
  }
];
