import { Routes } from '@angular/router';
import {SetupIndividualComponent} from './setupindividual/setupindividual.component'
import {FeeComponent} from './fee/fee.component'
import {StandardFeeComponent} from './standardfee/standardfee.component'
import {TransactionComponent} from './transaction/transaction.component';

export const BillingRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: 'yearlyfee',
            component: StandardFeeComponent,
            data: {
              title: "Yearly Fee",
              urls: [
                { title: "Fee's", url: 'maintenance/billing/yearlyfee' },
                { title: "Yearly Fee" }
              ]
            }
          },
          {
            path: 'bill',
            component: SetupIndividualComponent,
            data: {
              title: 'Set up Individual',
              urls: [
                { title: 'Set up Individual', url: '/billing/bill' },
                { title: 'Set up Individual' }
              ]
            }
          },
          {
            path: 'transaction',
            component: TransactionComponent,
            data: {
              title: "Transaction",
              urls: [
                { title: "Fee's", url: 'maintenance/billing/transaction' },
                { title: "Transaction" }
              ]
            }
          },
          
        ]
      }
  ];
  
