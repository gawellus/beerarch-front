import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.css']
})
export class PopularListComponent implements OnInit {

  @Input() data;
  displayedColumns: string[] = ['no', 'name', 'count'];

public dataSource;

  constructor() { }

  ngOnInit(): void {
    console.log('fired');
    this.dataSource = this.data;
  }

}
