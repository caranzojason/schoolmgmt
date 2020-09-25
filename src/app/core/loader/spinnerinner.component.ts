import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-innerspinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerInnerComponent implements OnInit {

  constructor(public spinner: SpinnerService) { }

  ngOnInit() {
  }

}