export class EnvService {
    public production: false;
     // The values that are defined here are the default values that can
     // be overridden by env.js
    
        //for dev
        public  api = 'http://127.0.0.1:8000/api/';

   //   public api = 'https://schoomanagementapi.sjcc.edu.ph/public/api/';
 
 
 
     // Whether or not to enable debug mode
     public enableDebug = true;
   
     constructor() {
     }
   
   }