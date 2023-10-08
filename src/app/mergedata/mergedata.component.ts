import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-mergedata',
  templateUrl: './mergedata.component.html',
  styleUrls: ['./mergedata.component.scss']
})
export class MergedataComponent implements OnInit {
  duplicateData: any[] = [];
  collectionName: string = 'Guest';
  tableHeaders: string[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.retrieveAndDisplayDuplicates();
  }

  retrieveAndDisplayDuplicates() {
    const tableHeaders = ['Person', 'Recorded_Type', 'Value', 'Date', 'Time', 'Entered_by', 'Location'];
    this.apiService.getCsvData(this.collectionName).subscribe((data1: any[]) => {
      this.apiService.getCsvData(this.collectionName + '_temp').subscribe((data2: any[]) => {
  
        const uniqueIdentifier = 'Person';
  
        // Find matching persons and merge their data
        this.duplicateData = this.mergeDuplicateData(data1, data2, uniqueIdentifier);
  
        if (this.duplicateData.length === 0) {
          console.log('No duplicates found.');
        } else {
          console.log('Duplicates:', this.duplicateData);
          this.tableHeaders = tableHeaders;
        }
      });
    });
  }
  
  
  mergeDuplicateData(data1: any[], data2: any[], uniqueIdentifier: string): any[] {
    const mergedData: any[] = [];

    for (const item1 of data1) {
      const matchingItem2 = data2.find((item2) => item2[uniqueIdentifier] === item1[uniqueIdentifier]);

      if (matchingItem2) {
        // Create a merged object with data from both collections
        const mergedItem = { ...item1, ...matchingItem2 };
        mergedData.push(mergedItem);
      }
    }

    return mergedData;
  }
}
  

