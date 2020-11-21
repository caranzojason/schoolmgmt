import { Component, AfterViewInit,ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import { MatTabChangeEvent,MatTabGroup } from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {EnrollmentDialog} from '../common/dialog/enrollmentdialog';
import { Enrollment } from '../enrollment/model/Enrollment';
import { EnrollmentService } from '../enrollment/service/enrollment.service';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../enrollment/model/Payment';
import { EnrollmentData } from './model/EnrollmentDTO';
import pdfMake from 'pdfmake/build/pdfmake';//https://www.ngdevelop.tech/angular-8-export-to-pdf-using-pdfmake/?fbclid=IwAR0Ekl0cKqzQOIG6TiX9FrPPwL0gyr7pUFyBFp9FE56ZaoUD_27GOHPwf9k
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportService } from './service/service.report';
import { EnrollReport } from './model/EnrollReportDTO';
import { AssesmentDTO } from './model/AssesmentDTO';
import { AssesmentDetailDTO } from './model/AssesmentDetailDTO';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  templateUrl: './assessmentslip.component.html',
  styleUrls: ['./reports.scss'],
})

export class AssessmentSlipComponent implements OnInit {
  displayedColumns: string[] = ['ref_no', 'lastname', 'firstname', 'email','status','actions'];
    dataSource: MatTableDataSource<Enrollment>;
    @ViewChild(MatSort,{static:false}) sort: MatSort;
    @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
    enrolmentList:Enrollment;
    public deparmentList:any;
    public enrol: Array<any>
    enrollReport:AssesmentDTO =
    {
      "schoolyearfrom":0,
      "schoolyearto":0,
      "detailNo":0
    };
    public schoolyearList:any = [
      {id:2020,name:'2020'},
      {id:2021,name:'2021'},
      {id:2022,name:'2022'}
    ];

    public detailNoList:any = [
      {id:1,name:'1'},
      {id:2,name:'2'},
      {id:3,name:'3'},
      {id:4,name:'4'},
      {id:5,name:'5'},
      {id:6,name:'6'},
      {id:7,name:'7'},
      {id:8,name:'8'},
      {id:9,name:'9'},
      {id:10,name:'10'},
      {id:11,name:'11'},
      {id:12,name:'12'},
    ];
    dataAssessment:any = 
    [
      {
        "student":
        [
          {"studentIds":2020,
          "studentDetail":[
           {
           "schoolyearfrom": 2020,
           "studentId": 2021,
           "studentName": "ABAO-AN TRISTAN JOHN",
           "detailNo": 1,
           "feeType": 1,
           "Fee": "Tution Fee",
           "amount": "20"
           },
           {
           "schoolyearfrom": 2020,
           "studentId": 2021,
           "studentName": "ABAO-AN TRISTAN JOHN",
           "detailNo": 1,
           "feeType": 2,
           "Fee": "Misc. Fees",
           "amount": "30"
           },
           {
           "schoolyearfrom": 2020,
           "studentId": 2021,
           "studentName": "ABAO-AN TRISTAN JOHN",
           "detailNo": 1,
           "feeType": 3,
           "Fee": "Other Fees",
           "amount": "40"
           },
           {
           "schoolyearfrom": 2020,
           "studentId": 2021,
           "studentName": "ABAO-AN TRISTAN JOHN",
           "detailNo": 1,
           "feeType": 4,
           "Fee": "LMS",
           "amount": "50"
           }
         ]
        },
        {"studentIds":2021,
        "studentDetail":[
         {
         "schoolyearfrom": 2020,
         "studentId": 2021,
         "studentName": "ABAO-AN TRISTAN JOHN",
         "detailNo": 1,
         "feeType": 1,
         "Fee": "Tution Fee",
         "amount": "20"
         },
         {
         "schoolyearfrom": 2020,
         "studentId": 2021,
         "studentName": "ABAO-AN TRISTAN JOHN",
         "detailNo": 1,
         "feeType": 2,
         "Fee": "Misc. Fees",
         "amount": "30"
         },
         {
         "schoolyearfrom": 2020,
         "studentId": 2021,
         "studentName": "ABAO-AN TRISTAN JOHN",
         "detailNo": 1,
         "feeType": 3,
         "Fee": "Other Fees",
         "amount": "40"
         },
         {
         "schoolyearfrom": 2020,
         "studentId": 2021,
         "studentName": "ABAO-AN TRISTAN JOHN",
         "detailNo": 1,
         "feeType": 4,
         "Fee": "LMS",
         "amount": "50"
         }
       ]
      }
        ]
      }
   
     
    ]
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
  }

  schoolyearfrom:any;
  schoolyearto:any;
  detailNo:any;

  getDocument(){
    this._reportService.getAssesmentReport(this.schoolyearfrom,this.schoolyearto,this.detailNo).subscribe((data) => 
    {
       console.log(data);
        this.getDocumentDefinition();
    });
  }

  getDocumentDefinition() {
    var tempArr = [];
    let en = this.dataAssessment;//JSON.parse(JSON.stringify(this.dataAssessment));
    //array1.forEach(element => console.log(element));
     console.log(en);
    this.dataAssessment.forEach(en => {
    var xx = [];
    xx = en.student;
    console.log(xx);
    xx.forEach(e => {
      console.log(e.studentIds);
      var xxx = [];
      xxx = e.studentIds;
      console.log(xxx);
      xxx.forEach(e => {
        for(var i =0; i< e.studentDetail.length; i++)
        {
          tempArr.push(
            { 
              schoolyearfrom: e.studentDetail[i].schoolyearfrom, 
              studentId: e.studentDetail[i].studentId,
              studentName: e.studentDetail[i].studentName, 
              detailNo: e.studentDetail[i].detailNo,
              feeType: e.studentDetail[i].feeType,
              DESCRIPTION: en.studentDetail[i].Fee,
              AMOUNT: e.studentDetail[i].amount,
            }
          );
        }
      });

    });

      // for(var i=0;i<en.studentId.length;i++){
      //   for(var i =0; i< en.studentDetail.length; i++)
      //   {
      //     tempArr.push(
      //       { 
      //         schoolyearfrom: en.studentDetail[i].schoolyearfrom, 
      //         studentId: en.studentDetail[i].studentId,
      //         studentName: en.studentDetail[i].studentName, 
      //         detailNo: en.studentDetail[i].detailNo,
      //         feeType: en.studentDetail[i].feeType,
      //         DESCRIPTION: en.studentDetail[i].Fee,
      //         AMOUNT: en.studentDetail[i].amount,
      //       }
      //     );
      //   }
      // }
      var document = {
        content: [
          {
            text: 'Assessment Slip',
            bold: true,
            fontSize: 20,
            alignment: 'center',
            margin: [0, 0, 0, 20],
            border:2,
          
          },
          {
            columns: [
              [{
                text: 'Name : ' ,//,+ en.studentDetail[i].studentName,
                style: 'name'
              },
              {
                text: "Balamban"
              },
              {
                text: 'Email : ' + "jason.caranzo@gmail.com",
              },
              {
                text: 'Contant No : ' + "0908979898",
              }
              ],
              {
                  columns: [
                    {
                    
                    text: 'Logo Here ....'
                    },
                  ]
                }
            ]
          },
          // {
          //     text: '-----------------------------------------------------------------------------------------------------------------------------------------------'
          // },
          {
            columns : [
                          [
                          this.table(tempArr, ['DESCRIPTION','AMOUNT'])
                          ],
                          // [
                          // this.table(tempArr, ['AMOUNT'])
                                
                          // ],
                      ]
          },
          {
              text: '-----------------------------------------------------------------------------------------------------------------------------------------------'
          },
          {
              
              columns : [
                            {
                                text: 'Total Amount',
                                fontSize: 12,
                                bold: true,
                                decoration: 'underline',
                                alignment: 'center',
                            },
                            {
                              text: '12,434',
                              fontSize: 12,
                              alignment:'center'
                            }
                        ]
            },
        ],
        info: {
          title: "Assessment Slip",
          author: "Jan",
          subject: 'Assessment Slip',
        },
          styles: {
            header: {
              fontSize: 16,
              bold: true,
              margin: [0, 20, 0, 10],
              decoration: 'underline'
            },
            name: {
              fontSize: 12,
              bold: true
            },
            jobTitle: {
              fontSize: 14,
              bold: true,
              italics: true
            },
            sign: {
              margin: [0, 50, 0, 10],
              alignment: 'center',
              italics: true
            },
            tableHeader: {
              bold: true,
            }
          }
      };
      // pdfMake.createPdf(document).open();
      pdfMake.createPdf(document).open()
    });


  
  }
  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column]);
        })

        body.push(dataRow);
    });
    return body;
  }
  table(data, columns) {
    return {
      fontSize: 12,
      table: {
        widths: ['76.6%','16.6%'],
        fillColor: '#555555',
        headerRows: 2,
        fontSize: 12,
        
        body: this.buildTableBody(data, columns)
        
      },
      layout: {
        fillColor: function(rowIndex, node, columnIndex) {
          if (rowIndex === 0) {
            return '#ABABAA' ;
          } 
          return (rowIndex > 0 && rowIndex % 2  ? '#E9E9E9' : '#FBFBFB' ); 
          },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
        },
        vLineColor: function(i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
        }
    
      }
    };
  }
}
