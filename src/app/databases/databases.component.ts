import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCollectionDialogComponent } from '../delete-collection-dialog/delete-collection-dialog.component';




declare var window: any;

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss'],
})
export class DatabasesComponent  {
  errorMessage: string = '';
  collectionName = '';
  csvMetadata: any = {};
  deleteMessage: string | null = null;
  

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,private dialog: MatDialog
  ) {}
    

  deleteCollection(collectionName: string) {
    if (collectionName) {
      const dialogRef = this.dialog.open(DeleteCollectionDialogComponent, {
        data: { collectionName },
        panelClass: 'custom-dialog-panel' // Add this line
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          // User clicked "Yes," proceed with deletion
          this.apiService.deleteCollection(collectionName).subscribe(
            () => {
              const successMessage = `Collection ${collectionName} deleted successfully.`;
              // Show a success message or take further actions
            },
            (error) => {
              const errorMessage = `Error deleting collection: ${error}`;
              // Show an error message or take further actions
            }
          );
        } else {
          // User clicked "No" or closed the dialog, do nothing
        }
      });
    } else {
      console.error('Please provide a collection name.');
    }
  }
  


viewTable(collectionName: string): void {
  if (collectionName.trim() === '') {
    this.errorMessage = 'Please provide a collection name.';
    return;
  }

  this.router.navigate(['/database-view', collectionName]);
}


}
