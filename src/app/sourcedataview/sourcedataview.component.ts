import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-sourcedataview',
  templateUrl: './sourcedataview.component.html',
  styleUrls: ['./sourcedataview.component.scss']
})
export class SourcedataviewComponent {

  @Input() collapsed=false;
  @Input() screenWidth=0;
  getBodyClass():string{
    let styleClass='';
    if(this.collapsed&& this.screenWidth>768){
      styleClass='sourcedataview-trimmed';
    }
    else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
        styleClass='sourcedataview-md-screen'
    }
    
    return styleClass;

  }

}
