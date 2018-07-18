import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Page } from './../models/page.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  
  @Input() page: Page<any>;
  @Output() pageChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
