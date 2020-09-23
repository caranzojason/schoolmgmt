import { Routes } from '@angular/router';

import { ForVerificationComponent } from './forverification.component';
import { ForApprovalComponent } from './forapproval.component';
import { Inquiry } from './inquiry.component'
import { EnrollmentComponent } from './enrolment.component';
export const EnrollmentRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'forverification',
				component: ForVerificationComponent,
				data: {
					title: 'For Verification',
					urls: [
                        { title: 'Enrollment', url: '/enrollment/forapproval' },
						{ title: 'For Verification' }
					]
				}
            },
            {
				path: 'forapproval',
				component: ForApprovalComponent,
				data: {
					title: 'For Approval',
					urls: [
						{ title: 'Enrollment', url: '/enrollment/forapproval' },
						{ title: 'For Approval' }
					]
				}
            },
            {
				path: 'inquiry',
				component: Inquiry,
				data: {
					title: 'Inquiry',
					urls: [
						{ title: 'Enrollment', url: '/enrollment/inquiry' },
						{ title: 'inquiry' }
					]
				}
			},
			{
				path: 'enrol',
				component: EnrollmentComponent,
				data: {
					title: 'Enrollment',
					urls: [
						{ title: 'Enrollment', url: '/enrollment' },
						{ title: 'Enrollment' }
					]
				}
			}
		]
	}
];
