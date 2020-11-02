import { Routes } from '@angular/router';

import { ForVerificationComponent } from './forverification.component';
import { ForApprovalComponent } from './forapproval.component';
import { Inquiry } from './inquiry.component'
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentCollegeComponent } from './enrollmentcollege.component';
import { EnrollmentHighSchoolComponent } from './enrollmenthighschool.component';
import { EnrollmentElementaryComponent } from './enrollmentelementary.component';
import { EnrollmentSeniorComponent } from './enrollmentseniorhigh.component';
import { PaymentApprovalComponent } from './paymentapproval.component';
import { PaymentInquiryComponent } from './paymentinquiry.component';
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
				path: 'paymentapproval',
				component: PaymentApprovalComponent,
				data: {
					title: 'For Approval(Payment)',
					urls: [
						{ title: 'Enrollment', url: '/enrollment/paymentapproval' },
						{ title: 'For Approval(Payment)' }
					]
				}
			},
			{
				path: 'paymentinquiry',
				component: PaymentInquiryComponent,
				data: {
					title: 'Inquiry(Payment)',
					urls: [
						{ title: 'Enrollment', url: '/enrollment/paymentinquiry' },
						{ title: 'Inquiry(Payment)' }
					]
				}
			},
			// {
			// 	path: 'newstudent',
			// 	component: EnrollmentComponent,
			// 	data: {
			// 		title: 'Enrollment',
			// 		urls: [
			// 			{ title: 'Enrollment', url: '/enrollment' },
			// 			{ title: 'Enrollment' }
			// 		]
			// 	}
			// },
			{
				path: 'collegestudent',
				component: EnrollmentCollegeComponent,
				data: {
					title: 'Enrollment',
					urls: [
						{ title: 'Enrollment', url: '/enrollment' },
						{ title: 'Enrollment' }
					]
				}
			},
			{
				path: 'highschoolstudent',
				component: EnrollmentHighSchoolComponent,
				data: {
					title: 'Enrollment',
					urls: [
						{ title: 'Enrollment', url: '/enrollment' },
						{ title: 'Enrollment' }
					]
				}
			},
			{
				path: 'elementarystudent',
				component: EnrollmentElementaryComponent,
				data: {
					title: 'Enrollment',
					urls: [
						{ title: 'Enrollment', url: '/enrollment' },
						{ title: 'Enrollment' }
					]
				}
			},
			{
				path: 'seniorstudent',
				component: EnrollmentSeniorComponent,
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
