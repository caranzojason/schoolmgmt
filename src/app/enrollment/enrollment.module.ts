
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { MatTableFilterModule } from 'mat-table-filter';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ForVerificationComponent } from './forverification.component';
import { ForApprovalComponent } from './forapproval.component';
import { Inquiry } from './inquiry.component';
import { EnrollmentRoutes } from './enrollment.routing';
import { EnrollmentComponent } from './enrollment.component';
import {EnrollmentService} from './service/enrollment.service';
import { PaymentApprovalComponent } from './paymentapproval.component';
import { PaymentInquiryComponent } from './paymentinquiry.component';
import { EnrollmentDialogComponent } from './modal/enrolldialog.component';
import { EnrollmentCollegeComponent } from './enrollmentcollege.component';
import { EnrollmentHighSchoolComponent } from './enrollmenthighschool.component';
import { EnrollmentElementaryComponent } from './enrollmentelementary.component';
import { EnrollmentSeniorComponent } from './enrollmentseniorhigh.component';
import { EnrollmentGraduateComponent } from './enrollmentgraduate.component';
import { PaymentApprovalWalkinComponent } from './paymentapprovalwalkin.component';

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(EnrollmentRoutes),ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    // MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgbModule],
  declarations: [ForVerificationComponent,ForApprovalComponent,EnrollmentComponent,Inquiry,PaymentApprovalComponent,
    PaymentInquiryComponent,EnrollmentDialogComponent,EnrollmentCollegeComponent,
    EnrollmentHighSchoolComponent,EnrollmentElementaryComponent,EnrollmentSeniorComponent,EnrollmentGraduateComponent,PaymentApprovalWalkinComponent],
  entryComponents: [EnrollmentDialogComponent],
  providers: [
    EnrollmentService,
    //EnrollmentDialogBox
  ],
  // entryComponents: [EnrollmentDialog]
})
export class EnrollmentModule {}
