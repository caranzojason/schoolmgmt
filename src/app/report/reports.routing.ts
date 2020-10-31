import { Routes } from '@angular/router';
import { AssessmentSlipComponent } from './assessmentslip.component';
import { ReportsComponent } from './reports.component';

export const ReportsRoute: Routes = [
	{
		path: '',
		children: [
			{
				path: 'reports',
				component: ReportsComponent,
				data: {
					title: 'Reports',
					urls: [
                        { title: 'Reports', url: '/report/reports' },
						{ title: 'Reports' }
					]
				}
			},
			{
				path: 'assessmentslip',
				component: AssessmentSlipComponent,
				data: {
					title: 'Assessment Slip',
					urls: [
                        { title: 'Assessment Slip', url: '/report/assessmentslip' },
						{ title: 'Assessment Slip' }
					]
				}
            }
		]
	}
];
