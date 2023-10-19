import { HttpClient, HttpEventType , HttpProgressEvent, HttpResponse  } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { forkJoin } from 'rxjs';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-source-view',
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit  {

  private _temp: string;
  collectionName: string = ''; // Set the desired collection name here
  csvData: any[] = [];
  selectedFileName: string | undefined;
  selectedFile: File | null = null;
  selectedCollection = '';
  errorMessage: string = '';
  successMessage:string = '';
  showEdit: boolean[] = [];
  showDelete: boolean[] = [];
  showAdd:boolean[]=[];
  showModal = false;
  loading: boolean = false;
  oldHeader: string = ''; 
  uploadProgress = 0;


  constructor(private apiService:ApiService,private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2, private progress: NgProgress,
  
     private el: ElementRef) {
      this._temp = '';
      }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.collectionName = params.get('collectionName')!;
      this. retrieveCSVData(); // Fetch data from the backend
    });
  }
   retrieveCSVData() {
    const obs1 = this.apiService.retrieveCSVData(this.collectionName);
    const obs2 = this.apiService.retrieveCSVData(this.collectionName + '_temp');
  
    forkJoin([obs1, obs2]).subscribe(
      ([response1, response2]: [any[], any[]]) => {
        
        const concatenatedData = response1.concat(response2);
  
        if (concatenatedData.length > 0) {
          this.csvData = concatenatedData.map((row: any) => {
            const { _id, ...newRow } = row;
            return newRow;
          });
          this.errorMessage = '';
        } else {
          this.csvData = [];
          this.errorMessage = 'No data available.';
        }
      },
      (error) => {
        this.csvData = [];
        this.errorMessage = 'Error fetching CSV data: ' + (error.error || error.message);
      }
    );
  }
  
  // retrieveCSVData() {
  //   const obs1 = this.apiService.retrieveCSVData(this.collectionName);
  //   const obs2 = this.apiService.retrieveCSVData(this.collectionName + '_temp');
  
  //   forkJoin([obs1, obs2]).subscribe(
  //     ([response1, response2]: [any[], any[]]) => {
  
  //       const concatenatedData = response1.concat(response2);
  
  //       if (concatenatedData.length > 0) {
  //         this.csvData = concatenatedData;
  //         this.errorMessage = '';
  //       } else {
  //         this.csvData = [];
  //         this.errorMessage = 'No data available.';
  //       }
        
  //       // If you want to display _id values, you can loop through the data and log _id values to the console.
  //       // concatenatedData.forEach(item => {
  //         // console.log(`_id: ${item._id}`);
  //       // });
  //     },
  //     (error) => {
  //       this.csvData = [];
  //       this.errorMessage = 'Error fetching CSV data: ' + (error.error || error.message);
  //     }
  //   );
  // }
  








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
    const confirmation = confirm(`Are you sure you want to delete the row with index "${index}"?`);
  
    if (!confirmation) {
      return;
    }
  
    this.apiService.deleteDocumentByIndex(this.collectionName, index).subscribe(
      () => {
        console.log('Row deleted successfully');
        
        const indexToDelete = this.csvData.findIndex((row) => row.index === index);
        if (indexToDelete !== -1) {
          this.csvData.splice(indexToDelete, 1); // Remove the row locally
          console.log('Row removed from local data');
        } else {
          console.warn('Row not found in local data');
        }
      },
      (error) => {
        console.error('Error deleting row', error);
        if (error.status === 404) {
          alert('Row not found. It may have been deleted by another user.');
        } else if (error.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    );
  }
  

















  // deleteRow(index: number): void {
  
  //   console.log('Deleting row at index:', index);
  //   this.csvData.splice(index, 1);
  // }

 
  // addRow(index: number): void {
    
  //   const newRow = { id: this.csvData.length + 1, name: `Row ${this.csvData.length + 1}` };

  
    
  //   this.apiService.addNewRowToCollection(newRow).subscribe((response) => {
      
  //     this.csvData.push(newRow);
  //   });
  // }
  addRow() {

    this.apiService.addRow(this.collectionName)
      .subscribe(
        (response) => {
          console.log('Row added successfully', response);
        },
        (error) => {
          console.error('Failed to add a new row', error);
        }
      );
  }

  // deleteRow(_id: string) {
  //   this.apiService.deleteRow(this.collectionName, _id).subscribe(
  //     response => {
  //       console.log('Row deleted successfully:', response);
       
  //       this.csvData = this.csvData.filter(row => row._id !== _id);
  //     },
  //     error => {
  //       console.error('Failed to delete the row:', error);
  //     }
  //   );
  // }

  
  
  
  

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  triggerFileInput() {
    // Trigger the hidden file input element
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  
 
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      console.log('Selected file:', file.name);
    }
  }
  private uploadFiles(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv') {
      
        this.selectedFile = file; // Store the selected file
        this.selectedFileName = file.name;
        console.log('Uploading CSV file:', file);
      } else {
        console.error('Invalid file type. Please select a CSV file.');
      }
    }
  }
  
  onUpload() {
    if (this.selectedFile) {
      this.progress.ref().start();
      this.loading = true;
      const collectionName_temp = this.collectionName + '_temp';

      this.apiService.uploadFile(this.selectedFile,  collectionName_temp).subscribe(
        (event:any) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadProgress = percentDone;
          } else if (event instanceof HttpResponse) {
            console.log('File uploaded successfully:', event);
            this.selectedFile = null;
            this.loading = false;
            this.progress.ref().complete();
          }
        },
        (error) => {
          console.error('An error occurred while uploading the file:', error);
          this.selectedFile = null;
          this.loading = false;
          this.progress.ref().complete();
        }
      );
    } else {
      console.error('No file selected.');
    }
  }



}
