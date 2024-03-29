

import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input,ChangeDetectorRef,ElementRef} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentListDialog } from '../../common/enrollmentdialog/enrollmentdialog';
import { EnrollmentDialog } from '../../common/dialog/enrollmentdialog';

import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentMasterService } from './studentmaster.service';
import { MatDialog } from '@angular/material/dialog';
import {Student} from './model/Student'
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute,Router} from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
    templateUrl: './student.component.html',
    styleUrls: ['./student.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent implements AfterViewInit {
  enrolmentList:Array<Student>;
  subtitle: string;
  displayedColumns: string[] = ['studentno', 'lastname','firstname', 'email','strandnane','coursename','status','actions'];
  dataSource: MatTableDataSource<Student>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  public enrollment:Student = {
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
    "courseId":0,
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
    "gradename":"",
    "strandname":"",
    "coursename":""
    
  }

  public deparmentList:any;
  public gradesList:any =  [{id:0,name:""}];
  public trackStandardCourse:any = [{id:0,name:""}];
  public schoolyearList:any = [{id:2020,name:"2020"},{id:2021,name:"2021"},{id:2022,name:"2022"}];
  public schoolsemesterList:any = [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}]; //3 is summer
  maxDate ={year: new Date().getUTCFullYear()+30,month: 12, day: 31}
  minDate ={year: new Date().getUTCFullYear()-90,month: 12, day: 31}
  startDate={year: new Date().getUTCFullYear()-15,month: new Date().getUTCMonth(), day: 1}
  public currentTabIndex = 1 
  @Input() hasPagination = true
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  schoolyearfrom:any;
  schoolyearto:any;
  // MatPaginator Output
  pageEvent: PageEvent;
  studentAction:string = "";

  // @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild('filterInput',{static:false}) filterInput: ElementRef;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

  constructor(private _enrollService:StudentMasterService,public dialog: MatDialog, private _route: ActivatedRoute,private changeDetectorRefs: ChangeDetectorRef) {
    this.subtitle = 'for verification';

  }


      
  setEnrolDialog(){
    const dialogRef = this.dialog.open(EnrollmentListDialog, {
        width: '1000px',
        data: {  message: "test"}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.enrollment = result;
        if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
        else{
          const [year, month, day] = this.enrollment.dob.split('-');
          const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
          this.enrollment.dob = obj;
        }
     
        this.selectDepartment();
        this.changeDetectorRefs.detectChanges();
        console.log(result);  
      });
  }

  getEnrolList(){
    this.setEnrolDialog();
  }
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })

    this._enrollService.getStudentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
    {
      this.enrolmentList = data.Student;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator.length = data.NoOfRecords;
      this.length = data.NoOfRecords;
    });
  }
   downloadPDF() {
   // var data = document.getElementById('content');  
    // html2canvas(data,{scrollY: -window.scrollY}).then(canvas => {  

    //   // // Few necessary setting options  
    //   // var imgWidth = 297;   
    //   // var pageHeight = 210;    
    //   // var imgHeight = canvas.height * imgWidth / canvas.width;  
    //   // //var heightLeft = imgHeight; 
  
    //   // const contentDataURL = canvas.toDataURL('image/png')  
    //   // let pdf = new jsPDF('l', 'mm', [297, 210]); // A4 size page of PDF  
    //   // var position = 0;  
    //   // pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, imgHeight)
    //   // //pdf.output('dataurlnewwindow'); // Generated PDF   
    //   // window.open(pdf.output('bloburl'), '_blank');

    //   $("pdfOpenHide").attr("hidden", 1);
    //   // To disable the scroll
    //   document.getElementById("alldata").style.overflow = "inherit";
    //   document.getElementById("alldata").style.maxHeight = "inherit";

    // });  
    var data = document.getElementById("content");
        //$("pdfOpenHide").attr("hidden", 1);
        // To disable the scroll
        // document.getElementById("alldata").style.overflow = "inherit";
        // document.getElementById("alldata").style.maxHeight = "inherit";
    
         html2canvas(data, { scrollY: -window.scrollY, scale: 2 }).then(
          canvas => {
            const contentDataURL = canvas.toDataURL("image/png", 1.0);
            // enabling the scroll
            // document.getElementById("alldata").style.overflow = "scroll";
            // document.getElementById("alldata").style.maxHeight = "150px";
    
            let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
    
            let imgWidth = 300;
            let pageHeight = pdf.internal.pageSize.height;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            window.open(
              pdf.output("bloburl", { filename: "new-file.pdf" }),
              "_blank"
            );
          }
        );
  } 
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filter = filterValue;
  }

  addNew(){
    this.studentAction = "add";
    this.enrollment = {
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
      "courseId":0,
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
      "gradename":"",
      "strandname":"",
      "coursename":""
    }

    this.tabGroup.selectedIndex = 1
  }

  public selectDepartment()
  {
    this.enrollment.department = Number(this.enrollment.department);
    this.enrollment.grade = Number(this.enrollment.grade);
    this.enrollment.courseId = Number(this.enrollment.courseId);
    this.enrollment.strand = Number(this.enrollment.strand);

      this.schoolsemesterList= [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"summer"}];
      if( Number(this.enrollment.department) != 5 ){//not equal to colege
          this._enrollService.getGrades(this.enrollment.department).subscribe((data:any) => 
          {
              this.gradesList = data;
              console.log(this.gradesList);
              this.changeDetectorRefs.detectChanges();
          });
      }else{
          this.gradesList = [{id:0,name:"N/A"}];
          this.changeDetectorRefs.detectChanges();
      }

      if( Number(this.enrollment.department) == 1 ||  Number(this.enrollment.department) == 2){ //elem,junio
          this.trackStandardCourse =  [{id:0,name:"N/A"}];
          //asign to default value
          // if(this.enrollment.department == 1){
          //     this.enrollment.grade = 1;
          // }else{
          //     this.enrollment.grade = 9;
          // }
          this.gradesList = [{id:0,name:"N/A"}];
          this.schoolsemesterList = [{id:0,name:"N/A"}];
          
      }

      if( Number(this.enrollment.department) == 3 ) //senior
      {
          //set default selected value
          // this.enrollment.grade = 13;
          // this.enrollment.strand = 1;
          // this.enrollment.semester = 1;
          this._enrollService.getStrand().subscribe((data:any) => 
          {
              this.trackStandardCourse = data;
              this.changeDetectorRefs.detectChanges();
          });
      } else if( Number(this.enrollment.department == 4) ||  Number(this.enrollment.department == 5)){//,colege, master grad
          // this.enrollment.grade = 15;
          // this.enrollment.strand = 1;
          // this.enrollment.semester = 1;
          this._enrollService.getCoursesByDeptId(this.enrollment.department).subscribe((data:any) => 
          {
              this.trackStandardCourse = data;
              this.changeDetectorRefs.detectChanges();
          });
      }
     
    
      this.tabGroup.selectedIndex = 1
    


  }

  public edit(row)
  {
    
    this.studentAction = "edit";
    this.enrollment = row;
    console.log(this.enrollment);
    if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
    else{
      const [year, month, day] = this.enrollment.dob.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
      this.enrollment.dob = obj;
    }
 
    this.selectDepartment();

  }

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index
    if(event.index == 0){
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  setDialog(message){
    const dialogRef = this.dialog.open(EnrollmentDialog, {
        width: '300px',
        data: {  message: message}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
}

  public save(){

    if(this.enrollment.lastname == ""){
        this.setDialog("LastName is required!");
        return;
    }

    if(this.enrollment.firstname == ""){
        this.setDialog("Firstname is required!");
        return;
    }

    if(this.enrollment.age <= 0){
        this.setDialog("Age is required!");
        return;
    }

    if(this.enrollment.gender == ''){
        this.setDialog("Gender is required!");
        return;
    }

    if(this.enrollment.department == 0){
        this.setDialog("Department is required!");
        return;
    }

    if(this.enrollment.grade == 0){
        this.setDialog("Grade is required!");
        return;
    }


    if(this.enrollment.address == ''){
        this.setDialog("Address is required!");
        return;
    }

    if(this.enrollment.dob == ''){
        this.setDialog("Date of birth is required!");
        return;
    }

    if(this.enrollment.place_of_birth == ''){
        this.setDialog("Place of birth is required!");
        return;
    }

    if(this.enrollment.contactno == ''){
        this.setDialog("Contact No is required!");
        return;
    }
    
    if(this.enrollment.email == ''){
        this.setDialog("Email is required!");
        return;
    }

    console.log(this.studentAction);

    if(this.studentAction == "add"){
      this._enrollService.createStudent(this.enrollment).subscribe((data:any) => 
      {
          console.log(data);
          this.setDialog("Successfully Created");
      });
    }else if(this.studentAction == "edit"){
      console.log(this.enrollment);
      this._enrollService.updateStudent(this.enrollment).subscribe((data:any) => 
      {
          console.log(data);
          this.setDialog("Successfully Updated");
      });
    }
  }

  pageEvents(event: any) {
    this._enrollService.getStudentList(event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
    {
      this.enrolmentList = data.Student;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
    });
 }

 search(){
   this._enrollService.getStudentList(0,this.pageSize,this.filter).subscribe((data:any) => 
   {
    this.enrolmentList = data.Student;
    this.dataSource = new MatTableDataSource( this.enrolmentList);
     this.changeDetectorRefs.detectChanges();
   });
 }

 refresh(){
  this.filterInput.nativeElement.value = "";
  this.dataSource.filter = "";
  this.filter = "";

  this._enrollService.getStudentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
  {
    this.enrolmentList = data.Student;
    this.dataSource = new MatTableDataSource( this.enrolmentList);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator.length = data.NoOfRecords;
    this.length = data.NoOfRecords;
  });
 }
}

