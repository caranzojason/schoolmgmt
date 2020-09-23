import { Component, AfterViewInit, ViewChild,ChangeDetectionStrategy,Input} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentDialog } from './enrollmentdialog';
import { PageEvent,MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EnrollmentService } from './service/enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { Enrollment } from './model/Enrollment';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute,Router} from '@angular/router';

@Component({
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Inquiry implements AfterViewInit {
  enrolmentList:Array<Enrollment>;
  subtitle: string;
  displayedColumns: string[] = ['ref_no', 'lastname', 'email','status','actions'];
  dataSource: MatTableDataSource<Enrollment>;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
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
    "fathercontact":0,
    "fatherplace": "",
    "mothername": "",
    "motherocc": "",
    "mothercontact": 0,
    "motherplace": "",
    "guardian_name": "",
    "guardian_contactno": 0,
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

  public deparmentList:any;
  public gradesList:any =  [{id:0,name:""}];
  public trackStandardCourse:any = [{id:0,name:""}];

  public currentTabIndex = 1 
  @Input() hasPagination = true
  length = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  filter="";
  pageNo = 0;
  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild('tabs',{static:false}) tabGroup: MatTabGroup;

  constructor(private _enrollService:EnrollmentService,public dialog: MatDialog, private _route: ActivatedRoute) {
    this.subtitle = 'for verification';

  }
  
  ngAfterViewInit() {
    this._enrollService.getAllDepartment().subscribe((data:any) => 
    {
        this.deparmentList = data;
    })

    this._enrollService.getEnrollmentList(this.pageIndex,this.pageSize,"").subscribe((data:any) => 
    {
      console.log(data.NoOfRecords);
      this.enrolmentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator.length = data.NoOfRecords;
      this.length = data.NoOfRecords;
    });


    // this._route.queryParamMap.subscribe((paramMap)=>{
    //   console.log({paramMap})
    //   const pageIndex = Number(paramMap.get('pageIndex'))
    //   const pageSize = Number(paramMap.get('pageSize'))
    //   if(pageSize){
    //     this.pageSize = pageSize
    //     this.paginator.pageSize = pageSize
    //   }
    //   if(pageIndex){
    //     this.pageIndex = pageIndex
    //     this.paginator.pageIndex = pageIndex
    //   }
    //   this.length = 50
    // })
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public selectDepartment()
    {
        if(this.enrollment.department != 5){//not equal to colege
            this._enrollService.getGrades(this.enrollment.department).subscribe((data:any) => 
            {
                this.gradesList = data;
            });
        }else{
            this.gradesList = [{id:0,name:"N/A"}];
        }

        if(this.enrollment.department == 1 || this.enrollment.department == 2){ //elem,junio
            this.trackStandardCourse =  [{id:0,name:"N/A"}];
        }

        if(this.enrollment.department == 3 ) //senior
        {
            this._enrollService.getStrand().subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
        if(this.enrollment.department == 4 || this.enrollment.department == 5 ){//,colege
            this._enrollService.getCoursesByDeptId(this.enrollment.department).subscribe((data:any) => 
            {
                this.trackStandardCourse = data;
            });
        }
    }

  public edit(row)
  {
    this.enrollment = row;
    if(typeof this.enrollment.dob === 'object' && this.enrollment.dob !== null){ }
    else{
      const [year, month, day] = this.enrollment.dob.split('-');
      const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
      this.enrollment.dob = obj;
    }
 
    this.selectDepartment();
    this.tabGroup.selectedIndex = 1
  }

  getSelectedIndex(): number {
    return this.currentTabIndex;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index
    if(event.index == 0){
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public verify(){
    var scope = this;
    this._enrollService.updateStatus(this.enrollment).subscribe((data:any) => 
    {
        const dialogRef = this.dialog.open(EnrollmentDialog, {
          width: '300px',
          data: {  message: "Successfully Verified!"}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          scope.tabGroup.selectedIndex = 0;
          console.log(scope.tabGroup.selectedIndex );
        });
    });
  }


  pageEvents(event: any) {
    console.log(event.pageIndex);
    console.log(event.pageSize);
    this._enrollService.getEnrollmentList(event.pageIndex,event.pageSize,this.filter).subscribe((data:any) => 
    {
      console.log(data);
      this.enrolmentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
     // this.dataSource.paginator = this.paginator;
     // this.dataSource.sort = this.sort;
      //this.length = data.NoOfRecords;
    });
 }

  handlePageIndexChange(value:number){
    console.log("handlePageIndexChange");
    console.log({value})

    // this.pageIndex = value
    this.paginator.pageIndex = Number(value)

    this._enrollService.getEnrollmentList(this.pageIndex,this.pageSize,this.filter).subscribe((data:any) => 
    {
      console.log(data);
      this.enrolmentList = data.Enrollment;
      this.dataSource = new MatTableDataSource( this.enrolmentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator.length = data.NoOfRecords;
      this.length = data.NoOfRecords;
    });
    console.log(this.pageIndex);
    console.log(this.pageSize);
  }


}
