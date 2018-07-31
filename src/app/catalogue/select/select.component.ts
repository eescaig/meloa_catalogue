import { DatasetList } from './../models/dataset-list.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

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
  @Input() reset : boolean;
  @Output() selectEvent = new EventEmitter();
  defaultValue : string = 'Choose...';

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.selectForm = this.fb.group({selectControl: [this.defaultValue]});
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('Cambios en los combos ', changes);
    if(changes['reset']!=null && changes['reset'].currentValue==true) {
      this.selectForm = this.fb.group({selectControl: [this.defaultValue]});
    }
    
  }

  onChangeCombo(value) {
    this.selectEvent.emit(value);
  }

}
