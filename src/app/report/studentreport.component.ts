import { Component, AfterViewInit,ViewChild, ChangeDetectorRef, OnInit, ElementRef } from '@angular/core';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  templateUrl: './studentreport.component.html',
  styleUrls: ['./reports.scss'],
})

export class StudentReportsComponent implements OnInit {
    @ViewChild('content', {static: false}) content: ElementRef;
  constructor(private _reportService:ReportService) {
    //this.enrolmentList = <Enrollment>{};
  }
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
    "courseId": 0,
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
    "approved_by": "",
    "cancelled_by": 0,
    "updated_by": "",
    "remarks": "",
    "created_at": "",
    "school_year": 0,
    "schoolyearfrom": 0,
    "schoolyearto": 0,
    "semester": 0,
  }

   ngOnInit() { }
  ngAfterViewInit() {
    
  }

   downloadPDF() {
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 297;   
      var pageHeight = 210;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      //var heightLeft = imgHeight; 
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('l', 'mm', [297, 210]); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight)
      //pdf.output('dataurlnewwindow'); // Generated PDF   
      window.open(pdf.output('bloburl'), '_blank');
    });  
  }  
  
}
