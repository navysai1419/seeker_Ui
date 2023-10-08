import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
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
  
   
    this.router.navigate(['/mergedata', collectionName]);
  } 

}
