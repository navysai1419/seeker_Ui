import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-source-view',
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit  {
  collectionName: string = ''; // Set the desired collection name here
  csvData: any[] = [];
  errorMessage: string = '';
  successMessage:string = '';
  showEdit: boolean[] = [];
  showDelete: boolean[] = [];
  showAdd:boolean[]=[];


  constructor(private apiService:ApiService,private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.collectionName = params.get('collectionName')!;
      this. retrieveCSVData(); // Fetch data from the backend
    });
  }

  retrieveCSVData() {
    this.apiService.retrieveCSVData(this.collectionName).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.csvData = response.map((row: any) => {
            const { _id, ...newRow } = row;
            return newRow;
        });
        this.errorMessage = '';
        } else {
          this. csvData = [];
          this.errorMessage = 'No data available.';
        }
      },
      (error) => {
        this. csvData = [];
        this.errorMessage =
          'Error fetching CSV data: ' + error.error || error.message;
      }
    );
  }
  showButtons(index: number): void {
    this.showEdit[index] = true;
    this.showDelete[index] = true;
    this.showAdd[index] = true;

  }

  hideButtons(index: number): void {
    this.showEdit[index] = false;
    this.showDelete[index] = false;
    this.showAdd[index] = false;
    
  }
  unhighlightIcon(i: number): void {
    const iconElements = this.el.nativeElement.querySelectorAll('.bi');

    if (iconElements && iconElements[i]) {
      this.renderer.removeClass(iconElements[i], 'highlighted');
    }
  }

  editRow(csvData: any): void {
    // Implement edit row logic here
    console.log('Editing row:', csvData);
  }

  deleteRow(index: number): void {
    // Implement delete row logic here
    console.log('Deleting row at index:', index);
    this.csvData.splice(index, 1);
  }

  addRow(index:number): void {
    // Implement add row logic here
    const newRow = { id: this.csvData.length + 1, name: `Row ${this.csvData.length + 1}` };
    this.csvData.push(newRow);
  }
  

}
