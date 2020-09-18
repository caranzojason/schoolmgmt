import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
     
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'enrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
      }
    ]
  },
  {
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'student',
        loadChildren: 	() => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'studentenrollment',
        loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
      }
		]
  },
  {
    path: '**',
    redirectTo: '/enrollment'
  }
];
