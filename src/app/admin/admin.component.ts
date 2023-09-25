import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router: Router) {}


  showMe:boolean=true;
  display:boolean=true;


ngOnInit()
{

}
Users()
{
    this.router.navigate(['/users']);  // define your component where you want to go
}

  
databases()
{
  // this.showMe==this.showMe;
  this.router.navigate(['/databases']);
  
}
seeker()
{
  // this.showMe==this.showMe;
  this.router.navigate(['/seeker-analytics']);
  
}
humanint()
{
  // this.showMe==this.showMe;
  this.router.navigate(['/human-int-analytics']);
  
}
cit()
{
  // this.showMe==this.showMe;
  this.router.navigate(['/cit-analytics']);
  
}


}
