import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  // {
  //   path: '/starter',
  //   title: 'Dashboard',
  //   icon: 'mdi mdi-gauge',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
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
        path: '/enrollment/forapproval',
        title: 'For Approval',
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
        path: '/enrollment/forapprovalpayment',
        title: 'For Approval(Payment)',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/enrollment/inquirypayment',
        title: 'Inquiry(Payment)',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
