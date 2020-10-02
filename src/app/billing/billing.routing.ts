import { Routes } from '@angular/router';
import {BillingComponent} from './billing.component'
import {FeeComponent} from './fee/fee.component'
import {YearlyFeeComponent} from './yearlyfee/yearlyfee.component'
export const BillingRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: 'bill',
            component: BillingComponent,
            data: {
              title: 'Billing',
              urls: [
                            { title: 'Billing', url: '/billing/bill' },
                { title: 'Billing' }
              ]
            }
          },
          {
            path: 'fee',
            component: FeeComponent,
            data: {
              title: "Student Fee",
              urls: [
                { title: "Fee's", url: 'maintenance/billing/fee' },
                { title: "Student Fee" }
              ]
            }
          },
          {
            path: 'yearlyfee',
            component: YearlyFeeComponent,
            data: {
              title: "Yearly Fee",
              urls: [
                { title: "Fee's", url: 'maintenance/billing/yearlyfee' },
                { title: "Yearly Fee" }
              ]
            }
          }
        ]
      }
  ];
  
