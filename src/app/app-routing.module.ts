import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthRouteGuard } from '../app/core/AuthRouteGuard';

//jasonx: use this path for outside enrolment http://localhost:4200/studentenrollment/newstudent
export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'enrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule),
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'report',
        loadChildren: () => import('./report/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthRouteGuard]
      },
      {
				path: 'student',
        loadChildren: 	() => import('./student/student.module').then(m => m.StudentModule)
      },
      {
				path: 'billing',
        loadChildren: 	() => import('./billing/billing.module').then(m => m.BillingModule)
      },
    ]
  },
  {
    
		path: '',
		component: BlankComponent,
		children: [
      { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },

      {
        path: 'studentenrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
      }
      ,
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
		]
  },
  {
    path: '**',
    redirectTo: 'authentication/login'
  }
];
