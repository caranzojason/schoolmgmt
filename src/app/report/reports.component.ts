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
    public deparmentList:any;
    public enrol: Array<any>
    public enrollment:Enrollment = {
      "id": 0,
      "ref_no": "",
      "type": null,
      "studentno": "",
      "firstname": "",
      "middlename": "",
      "lastname": "",
      "email": "",
      "grade": 0,
      "department": 1,
      "strand": 0,
      "dob": "",
      "place_of_birth": "",
      "contactno": "",
      "address": "",
      "nationality": "Filipino",
      "age": 0,
      "gender": "",
      "religion": "",
      "fathername": "",
      "fatherocc": "",
      "fathercontact":"",
      "fatherplace": "",
      "mothername": "",
      "motherocc": "",
      "mothercontact": "",
      "motherplace": "",
      "guardian_name": "",
      "guardian_contactno": "",
      "guardian_relation": "",
      "last_school_attended": "",
      "last_school_grade_level": "",
      "last_school_date_of_attendance": "",
      "last_school_address": "",
      "last_school_year": "",
      "indigenous": "no",
      "learning_modality": "",
      "status": "",
      "validated_by": "",
      "approved_by": 0,
      "cancelled_by": 0,
      "updated_by": "",
      "remarks": "",
      "created_at": "",
      "school_year": 0
  }
  constructor(private _enrollService:EnrollmentService) {
    //this.enrolmentList = <Enrollment>{};
  }

   ngOnInit() { }
  ngAfterViewInit() {
    //this.enrolmentList = <Enrollment>{};
    // this._enrollService.getAllDepartment().subscribe((data:any) => 
    // {
    //     this.deparmentList = data;
    // })
    this._enrollService.getEnrollmentForVerification().subscribe((data) => 
    {
        this.enrolmentList = data;
        console.log(this.enrolmentList);
    });
  }
  generatePdf(action = 'open'){
    var tempArr = [];
    let en = JSON.parse(JSON.stringify(this.enrolmentList));
    for(var i=0; i<en.length; i++){
       tempArr.push(
         { 
          RefNo: en[i].ref_no, 
           FirstName: en[i].firstname,
           LastName: en[i].lastname,
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
            this.table(tempArr, ['RefNo', 'FirstName', 'LastName'])
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
