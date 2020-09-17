import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Enrollment',
      urls: [
        { title: 'Landing', url: '/landing' },
        { title: 'Enrollment' }
      ]
    },
    component: LandingComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,NgDatepickerModule,NgbModule, RouterModule.forChild(routes)],
  declarations: [LandingComponent]
})
export class LandingModule {}
