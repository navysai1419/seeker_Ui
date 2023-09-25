import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-databaseview',
  templateUrl: './databaseview.component.html',
  styleUrls: ['./databaseview.component.scss']
})
export class DatabaseviewComponent implements OnInit {
  tableData: any[] = []; 
  columnNames: string[] = []; 
  fileUrl: string | undefined; // Store the Excel data here

  constructor() {}

  ngOnInit() {


    if (this.tableData.length > 0) {
      this.columnNames = Object.keys(this.tableData[0]);
    }
    // The data will be automatically available here if you navigate from "DatabasesComponent"
  }
}
