import { DatasetList } from './../models/dataset-list.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  
  selectForm : FormGroup;
  @Input() labelName : string;
  @Input() selectList : Observable<DatasetList>;
  @Input() styleSelect : string;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.selectForm = this.fb.group({selectControl: ['Choose...']});
  }

}
