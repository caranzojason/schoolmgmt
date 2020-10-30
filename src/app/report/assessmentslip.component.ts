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
 
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
  }

  getDocumentDefinition() {
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
              text: "Jason Caranzo",
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
        {
            text: '-----------------------------------------------------------------------------------------------------------------------------------------------'
        },
        {
          columns : [
                        [{
                            text: 'Discription',
                            style: 'header'
                        },
                                {
                                    text: 'Discription 1',
                                },
                                {
                                    text: 'Discription 2',
                                },
                            
                        ],
                        [{
                            text: 'Amount',
                            style: 'header'
                        },
                                {
                                    text: '5,445',
                                },
                                {
                                    text: '12,343',
                                },
                        ],
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
            fontSize: 16,
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
    pdfMake.createPdf(document).open();
  }
}
