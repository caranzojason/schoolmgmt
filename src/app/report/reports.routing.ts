import { Routes } from '@angular/router';
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
            }
		]
	}
];
