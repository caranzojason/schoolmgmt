import { Routes } from '@angular/router';
import {PassrecoveryComponent} from './PasswordRecovery/passrecovery.component'

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userrecovery',
        component: PassrecoveryComponent,
        data: {
          title: 'Password Recovery',
          urls: [
            { title: 'Password Recovery', url: 'user/userrecovery' }
          ]
        }
      }
    ]
  }
];
