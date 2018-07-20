import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  
  date: Date;
  @Input() labelDate : string;
  @Output() inputEvent = new EventEmitter();

  constructor() { }

  onChange() {
    this.inputEvent.emit(this.date);
  }

  ngOnInit() {
  }

}
