import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements OnInit {

  @Input() data;
  displayedColumns: string[] = ['no', 'name', 'brewery', 'style', 'date', 'rank'];

public dataSource;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.data;
  }

}
