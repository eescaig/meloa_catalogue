import { DatasetList } from './../models/dataset-list.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  
  selectForm : FormGroup;
  @Input() labelName : string;
  @Input() selectList : Observable<DatasetList>;
  @Input() styleSelect : string;
  @Output() selectEvent = new EventEmitter();
  selectedValue: string;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.selectForm = this.fb.group({selectControl: ['Choose...']});
  }

  onChangeCombo(value) {
    this.selectEvent.emit(value);
  }

}
