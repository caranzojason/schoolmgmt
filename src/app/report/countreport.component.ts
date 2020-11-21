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
  templateUrl: './countreport.component.html',
  styleUrls: ['./reports.scss'],
})

export class CounterReportsComponent implements OnInit {
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
      "type":[],
      "grade":[],
      "course":[],
      "strand":[],
      "semester":[],
      "gender":[],
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
    {id: 1, name: 'First Semister'},
    {id: 2, name: 'Second Semister'},
  
      ];
  public schoolyearList:any = [
    {id:2020,name:'2020'},
    {id:2021,name:'2021'},
    {id:2022,name:'2022'}
  ];
  selectedFrom:any;
  selectedto:any;
  enrollReportList: EnrollReport;
    elemCount: any;
    juniorHighCount: any;
    seniorHighCount: any;
    collegeCount: any;
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
  
  }

onSearch()
{ 
 
  this._reportService.getReportsCountElementary(this.selectedFrom,this.selectedto).subscribe((data) => 
    {
        this.elemCount = data;
        this._reportService.getReportsCountJuniorHigh(this.selectedFrom,this.selectedto).subscribe((data) => 
        {
            this.juniorHighCount = data;
            console.log(this.juniorHighCount);
            this._reportService.getReportsCountSeniorHigh(this.selectedFrom,this.selectedto).subscribe((data) => 
            {
                this.seniorHighCount = data;
                console.log(this.seniorHighCount);
                this._reportService.getReportsCountCollege(this.selectedFrom,this.selectedto).subscribe((data) => 
                {
                    this.collegeCount = data;
                    console.log(this.collegeCount);
                    this.generatePdf();
                });
            });
        });
    });
}

  generatePdf(){
    console.log(this.elemCount);
    var scope = this;
      var report = {
     
          content: 
          [
            {
              text: 'Count Reports',
              bold: true,
              fontSize: 20,
              alignment: 'center',
              margin: [0, 0, 0, 20]
            },
            {
              columns: [
                [{
                  text: ' School Year From ' + ' : ' + this.selectedFrom,
                  style: 'name'
                },
                {
                  text: ' School Year to ' + ' : ' + this.selectedto,
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
            {
                text: 'Elementary',
                style: 'header'
            },
            this.getEducationElem(this.elemCount),
            {
                text: 'Total No of Student : ' + scope.elemCount[0].totalNoOfStudent,
                style: 'name'
            },
            {
                text: 'Junior High',
                style: 'header'
            },
            this.getEducationJunior(this.juniorHighCount),
            {
                text: 'Total No of Student : ' + scope.juniorHighCount[0].totalNoOfStudent,
                style: 'name'
            },
            {
                text: 'Senior High',
                style: 'header'
            },
            this.getEducationSenior(this.seniorHighCount),
            {
                text: 'Total No of Student : ' + scope.seniorHighCount[0].totalNoOfStudent,
                style: 'name'
            },
            {
                text: 'College',
                style: 'header'
            },
            this.getEducationCollege(this.collegeCount),
            {
                text: 'Total No of Student : ' + scope.collegeCount[0].totalnoOfStudent,
                style: 'name'
            },
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
        widths: ['26.6%', '16.6%', '12.6%', '15.6%', '14.6%', '12.6%'],
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
  
 //Elementary Function 
  getEducationElem(educations: any[]) {
    return {
      table: {
        body: [
          [{
            text: 'Grade Course',
            style: 'tableHeader'
          },
          {
            text: 'No of Studen',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.GradeCourse, ed.noOfStudent];
          })
        ]
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
  //Junior High function ..
  getEducationJunior(educations: any[]) {
    return {
      table: {
        body: [
          [{
            text: 'Grade Course',
            style: 'tableHeader'
          },
          {
            text: 'No of Studen',
            style: 'tableHeader'
          }
          ],
          ...educations.map(ed => {
            return [ed.GradeCourse, ed.noOfStudent];
          })
        ]
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
  //Senior Function ..
  getEducationSenior(educations: any[]) {
    return {
      table: {
        body: [
          [{
            text: 'Grade 11',
            style: 'tableHeader'
          },
          {
            text: 'Grade 12',
            style: 'tableHeader'
          },
          {
            text: 'Grade Course',
            style: 'tableHeader'
          },
          {
            text: 'No of Student',
            style: 'tableHeader'
          }
          ],
          ...educations.map(ed => {
            return [ed.Grade11, ed.Grade12, ed.GradeCourse,ed.noOfStudent];
          })
        ]
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
  //College Function .. 
  getEducationCollege(educations: any[]) {
    return {
      table: {
        body: [
          [{
            text: 'First Year',
            style: 'tableHeader'
          },
          {
            text: 'Second Year',
            style: 'tableHeader'
          },
          {
            text: 'Third Year',
            style: 'tableHeader'
          },
          {
            text: 'Fourth Year',
            style: 'tableHeader'
          },
          {
            text: 'Grade Course',
            style: 'tableHeader'
          },
          {
            text: 'Iregular',
            style: 'tableHeader'
          },
          {
            text: 'No of Student',
            style: 'tableHeader'
          }
          ],
          ...educations.map(ed => {
            return [ed.FirstYear, ed.SecondYear, ed.ThirdYear,ed.FourthYear,ed.GradeCourse,ed.Iregular,ed.noOfStudent];
          })
        ]
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
