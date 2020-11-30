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
import { EnrollReport } from './model/EnrollReportDTO';
import { ReportService } from './service/service.report';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.scss'],
})

export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['ref_no', 'lastname', 'firstname', 'email','status','actions'];
    dataSource: MatTableDataSource<Enrollment>;
    @ViewChild(MatSort,{static:false}) sort: MatSort;
    @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
    enrolmentList:Enrollment;
 
    public enrol: Array<any>
    selectedDepartment: string[];
    enrollReport:EnrollReport =
    {
      "schoolyearfrom":0,
      "schoolyearto":0,
      "type":[],
      "department":[],
      "grade":[],
      "course":[],
      "strand":[],
      "semester":[],
      "gender":[],
      "status":[],
      "IsCheckedReportSchool":false,
      "IsCheckedReportDept":false,
      "IsCheckedReportGender":false,
      "IsCheckedReportGrade":false,
      "IsCheckedReportCourse":false,
      "IsCheckedReportStrand":false,
      "IsCheckedReportSem":false,

    };
    public deparmentList:any =[];
    public gradeList: any = [];
    public strandList: any =[];
    public coursetList: any =[];
    public genderList = [
    {id: 'Male', name: 'Male'},
    {id: 'Female', name: 'Female'},

      ];

    public semesterList = [
    {id: 1, name: 'First Semester'},
    {id: 2, name: 'Second Semester'},
  
      ];
  public schoolyearList:any = [
    {id:2020,name:'2020'},
    {id:2021,name:'2021'},
    {id:2022,name:'2022'}
  ];

  public studentTypeList:any = [
    {id:'yes',name:'Old Student'},
    {id:'no',name:'New Student'}
  ];

  public status:any = [
    {id:'verified',name:'Verified'},
    {id:'deleted',name:'Deleted'},
    {id:'ForPayment',name:'For Payment'},
    {id:'approved',name:'Approved'},
    {id:'pending',name:'Pending'},
    {id:'cancelled',name:'Cancelled'},
    {id:'inactive',name:'Inactive'},
    {id:'O',name:'Old'},
    {id:'PaymentForApproval',name:'Payment For Approval'}
  ];

  enrollReportList: EnrollReport;
  constructor(private _reportService:ReportService) {
  }

   ngOnInit() { }
  ngAfterViewInit() {
    this._reportService.getEnrollmentForVerification().subscribe((data) => 
    {
        this.enrolmentList = data;
    });

    this.getGradeAll();
    this.getDepartmentAll();
    this.getStrandAll();
    this.getCourseAll();

  }

  getGradeAll()
  {
    this._reportService.getAllGrades().subscribe((data) => 
    {
        this.gradeList = data;
    });
  }
  getDepartmentAll()
  {
    this._reportService.getAllDepartment().subscribe((data) => 
    {
        this.deparmentList = data;
        console.log(this.deparmentList);
    });
  }
  getStrandAll()
  {
    this._reportService.getAllStrand().subscribe((data) => 
    {
        this.strandList = data;
        console.log(this.strandList);
    });
  }
  getCourseAll()
  {
    this._reportService.getAllCourses().subscribe((data) => 
    {
        this.coursetList = data;
        console.log(this.coursetList);
    });
  }
onSearch()
{ 
  if ( this.enrollReport.department == "")
  {
    this.enrollReport.department = [];
  }
  if ( this.enrollReport.course == "")
  {
    this.enrollReport.course = [];
  }
  if ( this.enrollReport.gender == "")
  {
    this.enrollReport.gender = [];
  }
  if ( this.enrollReport.strand == "")
  {
    this.enrollReport.strand = [];
  }
  if ( this.enrollReport.semester == "")
  {
    this.enrollReport.semester = [];
  }
  if ( this.enrollReport.status == "")
  {
    this.enrollReport.status = [];
  }
  console.log(JSON.stringify(this.enrollReport));
  // return;
  this._reportService.getEnrollmentReport(this.enrollReport).subscribe((data) => 
    {
        this.enrollReportList = data;
        console.log(JSON.stringify(this.enrollReportList));
        this.generatePdf();
    });
   
}
  generatePdf(){
    var tempArr = [];
    let en = JSON.parse(JSON.stringify(this.enrollReportList));
    console.log(this.enrollReportList);
    for(var i=0; i<en.length; i++){
       tempArr.push(
         { 
          NAME: en[i].NAME, 
          DEPARTMENT: en[i].DEPARTMENT,
          GRADE: en[i].Grade, 
          STRAND: en[i].STRAND, 
          COURSE: en[i].COURSE,
          SEMESTER: en[i].SEMESTER,
          // GENDER: en[i].GENDER,
          }
        );
      var report = {
          content: 
          [
            {
              text: 'Reports',
              bold: true,
              fontSize: 20,
              alignment: 'center',
              margin: [0, 0, 0, 20]
            },
            {
              columns: [
                [{
                  text: ' School Year From ' + ' : ' + en[i].SCHOOLYEARFROM,
                  style: 'name'
                },
                {
                  text: ' School Year to ' + ' : ' + en[i].SCHOOLYEARTO,
                  style: 'name'
                },
                
              ]
            ]
            },
            {
              columns:
              [
                {
                  text:' '
                },
                {
                  text:' '
                }
              ]
            },
            this.table(tempArr, ['NAME','DEPARTMENT','GRADE','STRAND','COURSE','SEMESTER'])
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 20, 0, 10],
              decoration: 'underline'
            },
            name: {
              fontSize: 12,
              bold: true
            },
            tableHeader: {
              bold: true,
            
            }
          }
        };
      }
      pdfMake.createPdf(report).open();
    
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
        widths: ['20.6%', '16.6%', '16.6%', '12.6%', '15.6%', '10.6%'],
        fillColor: '#555555',
        // headerRows: 2,
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
