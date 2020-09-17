import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './forapproval.component.html'
})
export class ApproveList implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'for approval.';
  }

  ngAfterViewInit() {}
}
