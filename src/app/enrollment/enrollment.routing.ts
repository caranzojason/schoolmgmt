import { Routes } from '@angular/router';

import { ForVerificationComponent } from './forverification.component';
import { ForApprovalComponent } from './forapproval.component';
import { ApproveList } from './approvelist.component'
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
				path: 'approvelist',
				component: ApproveList,
				data: {
					title: 'Approve List',
					urls: [
						{ title: 'Enrollment', url: '/enrollment/approvelist' },
						{ title: 'Approve List' }
					]
				}
			}
		]
	}
];
