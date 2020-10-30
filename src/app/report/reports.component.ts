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
      "department":[],
      "grade":[],
      "course":[],
      "strand":[],
      "semester":[],
      "gender":[],
      "IsCheckedReport":false
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
    {id: 1, name: 'First Semister'},
    {id: 2, name: 'Second Semister'},
  
      ];
  public schoolyearList:any = [
    {id:2020,name:'2020'},
    {id:2021,name:'2021'},
    {id:2022,name:'2022'}
  ];
  enrollReportList: EnrollReport;
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
    //this.enrolmentList = <Enrollment>{};
    // this._enrollService.getAllDepartment().subscribe((data:any) => 
    // {
    //     this.deparmentList = data;
    // })
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
  // console.log(JSON.stringify(this.enrollReport));
  // return;
  this._reportService.getEnrollmentReport(this.enrollReport).subscribe((data) => 
    {
        this.enrollReportList = data;
        console.log(JSON.stringify(this.enrollReportList));
    });
}
  generatePdf(action = 'open'){
    var tempArr = [];
    let en = JSON.parse(JSON.stringify(this.enrollReportList));
    for(var i=0; i<en.length; i++){
       tempArr.push(
         { 
          SCHOOLYEARFROM: en[i].SCHOOLYEARFROM, 
          SCHOOLYEARTO: en[i].SCHOOLYEARTO,
          NAME: en[i].NAME,
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
            this.table(tempArr, ['SCHOOLYEARFROM', 'SCHOOLYEARTO', 'NAME'])
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 20, 0, 10],
              decoration: 'underline'
            },
            name: {
              fontSize: 16,
              bold: true
            },
            tableHeader: {
              bold: true,
            }
          }
        };
      }
      switch (action) {
      case 'open': pdfMake.createPdf(report).open(); break;
      case 'print': pdfMake.createPdf(report).print(); break;
      case 'download': pdfMake.createPdf(report).download(); break;
      default: pdfMake.createPdf(report).open(); break;
    }
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
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }
}
