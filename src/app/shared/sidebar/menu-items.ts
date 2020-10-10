import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [


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
  },
  {
    path: '',
    title: 'School Management',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/student/studentMaster',
        title: 'Student',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      }

    ]
  },
  {
    path: '',
    title: 'Billing',
    icon: 'mdi mdi-bullseye',
    class: 'has-arrow',
    extralink: false,
    submenu: [

          {
            path: '/billing/yearlyfee',
            title: 'Standard Fee',
            icon: 'mdi mdi-gauge',
            class: '',
            extralink: false,
            submenu: []
          },

          {
            path: '/billing/bill',
            title: 'Set up Individual Fees',
            icon: 'mdi mdi-gauge',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            path: '/billing/transaction',
            title: 'Transaction',
            icon: 'mdi mdi-gauge',
            class: '',
            extralink: false,
            submenu: []
          }
          // {
          //   path: '/billing/fee',
          //   title: 'Student Fee',
          //   icon: 'mdi mdi-gauge',
          //   class: '',
          //   extralink: false,
          //   submenu: []
          // },
    ]
  }

];
