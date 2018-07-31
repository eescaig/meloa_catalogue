import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  
  @Input() myValue : Date;
  @Input() labelDate : string;
  @Input() minDate : Date;
  @Input() maxDate : Date;
  @Output() inputEvent = new EventEmitter();
  
  @ViewChild('myPicker') picker;
  open() {
    this.picker.open();
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    /* console.log('Cambios en los inputs', changes['minDate']);
    this.myDate = (changes['minDate']) ? changes['minDate'].currentValue : ''; */
  }

  onChange(event: MatDatepickerInputEvent<Date>) {
    this.inputEvent.emit(event.value);
  }

}
