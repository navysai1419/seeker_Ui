import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  errorMessage: string = '';
  collectionName = '';
  csvMetadata: any = {};


  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  viewTable(collectionName: string): void {
    if (collectionName.trim() === '') {
      this.errorMessage = 'Please provide a collection name.';
      return;
    }
  
   
    this.router.navigate(['/source-view', collectionName]);
  }
 
  
}
