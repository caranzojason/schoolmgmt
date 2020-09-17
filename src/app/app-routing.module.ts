import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LandingComponent } from './landing/landing.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/landing', pathMatch: 'full' },
     
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

  // {
  //   path: '',
  //   component: FullComponent,
  //   children: [
  //     { path: '', redirectTo: '/enrollment', pathMatch: 'full' },
  //     {
  //       path: 'enrollment',
  //       loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
  //     }
  //   ]
  // },





  {
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'student',
				loadChildren:
					() => import('./student/student.module').then(m => m.StudentModule)
			}
		]
  },
  
  {
		path: '',
		component: BlankComponent,
		children: [
      {
        path: 'landing',
        loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
      }
		]
	},
  {
    path: '**',
    redirectTo: '/landing'
  }
];
