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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportService } from './service/service.report';
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
    dataAssessment = 
    [
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
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
  }

  getDocumentDefinition() {
    var tempArr = [];
    let en = JSON.parse(JSON.stringify(this.dataAssessment));
    console.log(en);
    for(var i=0; i<en.length; i++){
      tempArr.push(
        { 
          schoolyearfrom: en[i].schoolyearfrom, 
          studentId: en[i].studentId,
          studentName: en[i].studentName, 
          detailNo: en[i].detailNo,
          feeType: en[i].feeType,
          DESCRIPTION: en[i].Fee,
          AMOUNT: en[i].amount,
         }
       );
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
              text: 'Name : ' + en[0].studentName,
              style: 'name'
            }
            ]
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
  }
    pdfMake.createPdf(document).open();
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
