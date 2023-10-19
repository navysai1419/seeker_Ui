import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-panel-layout';
  isSideNavCollapsed=false;
  notificationMessage: string = '';
  subscreenVisible: boolean = true;
  screenWidth=0;
  sideBarOpen = true;
  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    
    this.sharedService.subscreenToggle.subscribe(() => {
      
      this.subscreenVisible = !this.subscreenVisible;
    });
  }
  sideBarToggler():void {
    this.sideBarOpen = !this.sideBarOpen;
  }

  
  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;


  }
 
  showAlertMessage(message: string) {
    this.notificationMessage = message;
  }
}