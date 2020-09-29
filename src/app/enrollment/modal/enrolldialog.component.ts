import { ChangeDetectionStrategy, Component, Optional, Input,EventEmitter,Output } from "@angular/core";
import { NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-modal",
    templateUrl: "./enrolldialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrollmentDialogComponent {
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
  @Input() public isSend;
    constructor(
      @Optional() private readonly activeModal: NgbActiveModal) {
    }

    public confirm(): void {
          this.isSend = true;
          this.activeModal.close();
          this.eventEmitter.emit(this.isSend);
    }

    public dismiss(): void {
        if (this.activeModal)
          this.activeModal.dismiss();
    }
}