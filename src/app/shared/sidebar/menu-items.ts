import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Billing',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Maintenance',
        icon: 'mdi mdi-gauge',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            path: '/billing/yearlyfee',
            title: 'Yearly Fee',
            icon: 'mdi mdi-gauge',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            path: '/billing/fee',
            title: 'Student Fee',
            icon: 'mdi mdi-gauge',
            class: '',
            extralink: false,
            submenu: []
          },
        ]
      },
      {
        path: '/billing/bill',
        title: 'Bill Student',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Enrollment',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/enrollment/forverification',
        title: 'For Verification',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/enrollment/inquiry',
        title: 'Inquiry',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/enrollment/paymentapproval',
        title: 'For Approval(Payment)',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/enrollment/paymentinquiry',
        title: 'Inquiry(Payment)',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
