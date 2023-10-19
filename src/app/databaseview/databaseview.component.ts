import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType , HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-databaseview',
  templateUrl: './databaseview.component.html',
  styleUrls: ['./databaseview.component.scss']
})
export class DatabaseviewComponent implements OnInit {
  collectionName: string = '';
  editedColumn: string = '';
  showEdit: boolean[] = [];
  notificationMessage: string = '';
  data: any[] = [];
  newColumnName: string ='';
  selectedHeader: string | null = null;
  selectedFileName: string | null=null;
  selectedFile: File | null = null;
  selectedCollection = '';
  originalColumnNames: string[] = this.data.slice(); 
  errorMessage: string = '';
  successMessage:string = '';
  newHeader: string = ''; // New header
  newDataRow: any = {}; // New row data
  editMode: boolean[] = []; 
  showDelete: boolean[] = [];
  showAdd:boolean[]=[];
  headerToRemove:string='';
  loading: boolean = false;
  oldHeader: string = ''; 
  uploadProgress = 0;
  isEditing: boolean[] = [];
  constructor(private apiService: ApiService,private route: ActivatedRoute,private http: HttpClient,private progress: NgProgress,
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

  // editRow(data: any): void {
  //   // Implement edit row logic here
  //   console.log('Editing row:', data);
  // }


 
  saveDataToMongoDB(): void {
    this.apiService.addHeaderToCSV(this.collectionName, this.newHeader).subscribe(
      (response) => {
        if (response === 'Header added successfully') {
          this.successMessage = 'Header added successfully';
          this.newHeader = '';
        } else {
          this.errorMessage = 'Error adding header: Unexpected response from the server';
        }
      },
      (error) => {
        this.errorMessage = 'Error adding header: ' + error.message;
        this.successMessage = '';
      }
    );
  }


  addRow(index: number): void {
    const newRow = { name: `Row ${this.data.length + 1}`, isEditable: true };
    this.data.push(newRow);
  }
  
  

  saveAddRow(index:number): void {
   
  
    
    this.apiService.addHeaderToCSV(this.collectionName, this.newHeader)
      .subscribe(
        (response) => {
          this.successMessage = 'Header added successfully';
          this.errorMessage = '';
          this.newHeader = '';
  
          const newRow = { id: this.data.length + 1, [this.newHeader]: null };
          this.data.push(newRow);
        },
        (error) => {
          this.errorMessage = 'Error adding header: ' + error.message;
          this.successMessage = '';
        }
      );
  }
  

  deleteRow(headerName: string): void {
    if (!headerName) {
      console.error('Header name is undefined.', headerName);
      return; 
    }
  
    const confirmation = confirm(`Are you sure you want to delete the row with header name "${headerName}"?`);
  
    if (!confirmation) {
      return; 
    }
  
    
    this.apiService.removeHeaderFromCSV(this.collectionName, headerName)
      .subscribe(
        (response) => {
          console.log('Row deleted successfully', response);
          
          const indexToDelete = this.data.findIndex((row) => row.headerName === headerName);
          if (indexToDelete !== -1) {
            this.data.splice(indexToDelete, 1); 
            console.log('Header removed successfully', response);
            
          }
          window.location.href = window.location.href;
        },
        (error) => {
          console.error('Error deleting row', error);
          

        }
      );
  }
  
  
  editRow(rowdata: string) {
    this.editedColumn = rowdata;
    // Additional logic for handling the edit, if needed
  }

  saveEditedColumn(index: number) {
    if (!this.editedColumn) {
      // Don't save if the edited column is empty
      return;
    }
  
    const originalColumnName = this.data[index]; 
  
    if (this.editedColumn === originalColumnName) {
      // If the edited column is the same as the original, no need to save
      this.editedColumn = ''; 
      return;
    }
  
    // Update the data array with the edited column name
    this.data[index] = this.editedColumn;
  
    this.apiService.editHeaderInCSV(this.collectionName, originalColumnName, this.editedColumn)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error updating header', error);
          if (error.status === 500) {
            this.errorMessage = 'Server error: Please check the server logs for details.';
          } else {
            this.errorMessage = 'Error updating header: ' + error.message;
          }
          throw error;
        })
      )
      .subscribe(
        (response) => {
          console.log('Header updated successfully', response);
          this.successMessage = 'Header updated successfully';
          this.editedColumn = ''; // Clear the editedColumn variable on success
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
 
  addHeaderAndRow(newHeader: string, index: number): void {
   
    this.apiService.addHeaderToCSV(this.collectionName, newHeader)
      .subscribe(
        (response) => {
          this.successMessage = 'Header added successfully';
          this.errorMessage = '';
          this.newHeader = '';
  
          
          const newRow = { id: this.data.length + 1 };
          
          // newRow[this.newHeader] = null; 
          this.data.push(newRow);
          this.editMode.push(true); 
        },
        (error) => {
          this.errorMessage = 'Error adding header: ' + error.message;
          this.successMessage = '';
        }
      );
  }
  toggleEditMode(index: number): void {
    this.editMode[index] = !this.editMode[index];
  }

  // saveRow(index: number): void {
  //   // Send a request to save the edited row data
  //   this.apiService.updateRowInCSV(this.collectionName, this.data[index])
  //     .subscribe(
  //       (response) => {
  //         // Data saved successfully
  //         console.log('Row saved:', response);
  //         this.successMessage = 'Row saved successfully';
  //         this.errorMessage = '';
  //         this.editMode[index] = false; // Disable edit mode after saving
  //       },
  //       (error) => {
  //         // Handle errors
  //         console.error('Error saving row:', error);
  //         this.errorMessage = 'Error saving row: ' + error.message;
  //         this.successMessage = '';
  //       }
  //     );
  // }


  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  triggerFileInput() {
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
        this.selectedFile = file;
        this.selectedFileName = file.name;
        console.log('Uploading CSV file:', file);

        // Call your upload function
        this.uploadFile();
      } else {
        console.error('Invalid file type. Please select a CSV file.');
      }
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.loading = true;
      this.apiService.uploadFile(this.selectedFile, this.collectionName).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadProgress = percentDone;
          } else if (event instanceof HttpResponse) {
            console.log('File uploaded successfully:', event);

            // Perform any necessary processing after successful upload
            const recordCount = event.body.recordCount; // Adjust this line to match your API response

            alert(`Successfully uploaded with record count: ${recordCount}`);

            // Clear the message after a few seconds (adjust as needed)
            setTimeout(() => {
              this.selectedFile = null;
              this.selectedFileName = null;
              this.uploadProgress = 0;
              this.loading = false;
            }, 5000);
          }
        },
        (error) => {
          console.error('An error occurred while uploading the file:', error);
          this.selectedFile = null;
          this.loading = false;
          this.uploadProgress = 0;
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  // onUpload() {
  //   if (this.selectedFile) {
  //     this.progress.ref().start();
  //     this.loading = true;
  
  //     this.apiService.uploadFile(this.selectedFile, this.collectionName).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           const percentDone = Math.round((100 * event.loaded) / event.total);
  //           this.uploadProgress = percentDone;
  //           const recordCount = event.body.recordCount; 
  
           
  //           this.notificationMessage = `Successfully uploaded with record count: ${recordCount}`;
  
  //           setTimeout(() => {
  //             this.notificationMessage = '';
  //           }, 5000);

  //         } else if (event instanceof HttpResponse) {
  //           console.log('File uploaded successfully:', event);
  
           
  //           const recordCount = event.body.recordCount; 
  
           
  //           this.notificationMessage = `Successfully uploaded with record count: ${recordCount}`;
  
  //           setTimeout(() => {
  //             this.notificationMessage = '';
  //           }, 5000);
  
  //           this.selectedFile = null;
  //           this.loading = false;
  //           this.progress.ref().complete();
  
  //           // Reload the page
  //           location.reload();
  //         }
  //       },
  //       (error) => {
  //         console.error('An error occurred while uploading the file:', error);
  //         this.selectedFile = null;
  //         this.loading = false;
  //         this.progress.ref().complete();
  //       }
  //     );
  //   } else {
  //     console.error('No file selected.');
  //   }
  // }
  
}



















