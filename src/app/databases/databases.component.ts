import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';




declare var window:any;

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})
export class DatabasesComponent  {
  forModal:any;
  fileUrl: string | undefined;
  selectedSheetType: string | undefined;
  tableData: any[] = [];
  selectedFile: File | undefined; // To store the selected file

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private router: Router) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file

    if (this.selectedFile) {
      // Set this.fileUrl to the URL of the selected file (you may need to sanitize the URL)
      this.fileUrl = window.URL.createObjectURL(this.selectedFile);

      // Reset selected sheet type when a new file is selected
      this.selectedSheetType = undefined;
    }
  }

  onSubmit() {
    if (!this.selectedSheetType) {
      console.error('Please select a sheet type/category.');
      return;
    }
  
    if (!this.selectedFile) {
      console.error('No file to upload.');
      return;
    }
  
    // Upload the Excel file with the selected sheet type/category
    this.apiService.uploadExcelFile(this.selectedSheetType, this.selectedFile).subscribe(
      (response) => {
        // Update the fileUrl property with the URL returned from the API
        this.fileUrl = response;
  
        // Navigate to the new page with the Excel data as a parameter
        this.router.navigate(['/databaseview'], { state: { data: this.tableData } });
      },
      (error) => {
        console.error('File upload error:', error);
        // Handle the error as needed
      }
    );
  }
  parseExcelData(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string | ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

      // Assuming you want to display the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Convert the sheet data to an array of objects
      this.tableData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    };

    reader.readAsBinaryString(file);
  }
  deleteExcelSheets() {
    if (!this.selectedSheetType) {
        console.error('Please select a sheet type to delete.');
        return;
    }

    this.apiService.deleteExcelSheetsBySheetType(this.selectedSheetType).subscribe(
        (response) => {
            console.log('Excel sheets deleted successfully.');
            // You can handle success messages or navigate to a different page if needed.
        },
        (error) => {
            console.error('Error deleting Excel sheets:', error);
            // Handle error messages or errors as needed.
        }
    );
}
  
  downloadExcelFile(id: string) {
    this.apiService.getExcelFile(id).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
  
        // Sanitize the URL before using it
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  
        // Use the string representation of the SafeResourceUrl
        this.fileUrl = safeUrl.toString();
      },
      (error) => {
        console.error('Error downloading Excel file:', error);
      }
    );
  }
  
  
  

  openModal(){
    this.forModal.show();
  }
  doSomething(){
    this.forModal.hide();
  }
  
}
