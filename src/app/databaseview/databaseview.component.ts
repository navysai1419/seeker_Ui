import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType , HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-databaseview',
  templateUrl: './databaseview.component.html',
  styleUrls: ['./databaseview.component.scss']
})
export class DatabaseviewComponent implements OnInit {
  collectionName: string = '';
  headers: string[] = [];
  data: any[] = [];
  selectedFileName: string | undefined;
  selectedFile: File | null = null;
  selectedCollection = '';
  errorMessage: string = '';
  successMessage:string = '';
  showEdit: boolean[] = [];
  showDelete: boolean[] = [];
  showAdd:boolean[]=[];
  newHeader: string = '';
  headerToRemove:string='';
  loading: boolean = false;
  oldHeader: string = ''; 
  uploadProgress = 0;

  constructor(private apiService: ApiService,private route: ActivatedRoute,private http: HttpClient, private progress: NgProgress,
    private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.collectionName = params.get('collectionName')!;
      this.getCSVData(); // Fetch data from the backend
    });

    const dropZone = this.el.nativeElement.querySelector('.file-drop-container');

    if (dropZone) {
      this.renderer.listen(dropZone, 'dragover', (event) => {
        this.onDragOver(event);
      });

      this.renderer.listen(dropZone, 'drop', (event) => {
        this.onDrop(event);
      });
    }
  }
  

  getCSVData(): void {
    this.apiService.getCsvData(this.collectionName).subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.data = response;
          this.errorMessage = '';
        } else {
          this.data = [];
          this.errorMessage = 'No data available.';
        }
      },
      (error) => {
        this.data = [];
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

  editRow(data: any): void {
    // Implement edit row logic here
    console.log('Editing row:', data);
  }

  deleteRow(index: number): void {
    // Implement delete row logic here
    console.log('Deleting row at index:', index);
    this.data.splice(index, 1);
  }

  addRow(index:number): void {
    // Implement add row logic here
    const newRow = { id: this.data.length + 1, name: `Row ${this.data.length + 1}` };
    this.data.push(newRow);
  }
  

  removeHeader() {
    this.apiService.removeHeaderFromCSV(this.collectionName, this.headerToRemove)
      .subscribe(
        (response) => {
          console.log('Header removed successfully', response);
          // Handle success or update UI as needed
        },
        (error) => {
          console.error('Error removing header', error);
          // Handle error or display an error message
        }
      );
  }
  editHeader() {
    this.apiService.editHeaderInCSV(this.collectionName, this.oldHeader, this.newHeader)
    .pipe(
      catchError((error) => {
        console.error('Error updating header', error);
        this.errorMessage = 'Error updating header: ' + error.message;
        throw error; 
      })
      )
      .subscribe(
        (response) => {
          console.log('Header updated successfully', response);
          this.successMessage = 'Header updated successfully';
         
        }
      );
  }
  addHeaderAndRow(): void {
    if (!this.newHeader) {
      this.errorMessage = 'New header is required.';
      return;
    }
  
    // First, add the new header
    this.apiService.addHeaderToCSV(this.collectionName, this.newHeader)
      .subscribe(
        (response) => {
          this.successMessage = 'Header added successfully';
          this.errorMessage = '';
          this.newHeader = '';
  
          // After adding the header, add a new row
          const newRow = { id: this.data.length + 1, [this.newHeader]: null };
          this.data.push(newRow);
        },
        (error) => {
          this.errorMessage = 'Error adding header: ' + error.message;
          this.successMessage = '';
        }
      );
  }


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

      this.apiService.uploadFile(this.selectedFile, this.collectionName).subscribe(
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



















