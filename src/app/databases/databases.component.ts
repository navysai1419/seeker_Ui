import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';




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
  

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
    
  deleteCollection(collectionName: string) {
    if (collectionName) {
      this.apiService.deleteCollection(collectionName).subscribe(
        () => {
          console.log(`Collection ${collectionName} deleted successfully.`);
          
        },
        (error) => {
          console.error(`Error deleting collection: ${error}`);
         
        }
      );
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
