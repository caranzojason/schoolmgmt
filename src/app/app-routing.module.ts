import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthRouteGuard } from '../app/core/AuthRouteGuard';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'enrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule),
        canActivate: [AuthRouteGuard]
      }
    ]
  },
  {
    
		path: '',
		component: BlankComponent,
		children: [
      { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
			{
				path: 'student',
        loadChildren: 	() => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'studentenrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
      }
      // ,
      // {
      //   path: 'authentication',
      //   loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      // }
		]
  },
  {
    path: '**',
    redirectTo: 'authentication/login'
  }
];
