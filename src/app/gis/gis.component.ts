import { Component,ElementRef,EventEmitter,OnInit, ViewChild } from '@angular/core';
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
  commuteDropdowns: Array<{ selectedInputType: string, inputValue: string }> = [];
  positionDropdowns: Array<{ selectedInputType: string, inputValue: string }> = [];

  subscreenHeight: number = 500; 
  public coordinates: { lat: number, lng: number }[] = [];

  selectedInputTypeCommute: string = 'none';
  inputValueCommute: string = '';
 
  selectedInputTypePosition: string = 'none';
  inputValuePosition: string = '';
  inputValue: string = '';
  subscreenToggle: EventEmitter<void> = new EventEmitter<void>(); 
  showSidebar: boolean = true;
  sidebarMinimized: boolean = false; 
  constructor(private router: Router,private sharedService: SharedService) {
   
    this.lat = 0;
    this.lng = 0;
    this.coordinates = []; 
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.coordinates = [
        { lat: this.lat, lng: this.lng },
        { lat: 17.450333, lng: 78.381052 },
        { lat: 17.4643, lng: 78.3756 },
        { lat: 17.4526, lng: 78.3783 }
      ];
      });
    }
  }
  
  addDropdown(section: 'commute' | 'position') {
    if (section === 'commute') {
      this.commuteDropdowns.push({ selectedInputType: 'none', inputValue: '' });
    } else if (section === 'position') {
      this.positionDropdowns.push({ selectedInputType: 'none', inputValue: '' });
    }
    this.subscreenHeight += 40;
  }

  removeDropdown(section: 'commute' | 'position', index: number) {
    if (section === 'commute') {
      this.commuteDropdowns.splice(index, 1);
    } else if (section === 'position') {
      this.positionDropdowns.splice(index, 1);
    }
    this.subscreenHeight -= 40;
  }
 

  toggleMinimization() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }
}
