import { Component, AfterViewInit } from '@angular/core';
@Component({
    selector: 'app-webres',
    styleUrls: ['./landing.scss'],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
