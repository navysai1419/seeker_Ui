import { Component,EventEmitter,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
// import {} from 'googlemaps';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent  implements OnInit{
  lat: number;
  lng: number;
  selectedInputType: string = 'none'; 
  inputValue: string = '';
  subscreenToggle: EventEmitter<void> = new EventEmitter<void>(); 

 
  constructor(private router: Router,private sharedService: SharedService) {
    // Initialize the properties in the constructor
    this.lat = 0;
    this.lng = 0;
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  
 
  
  toggleSubscreen() {
    this.sharedService.toggleSubscreen();
  }
}
