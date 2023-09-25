import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { DatabasesComponent } from './databases/databases.component';
import { SeekerAnalyticsComponent } from './seeker-analytics/seeker-analytics.component';
import { HumanIntAnalyticsComponent } from './human-int-analytics/human-int-analytics.component';
import { CitAnalyticsComponent } from './cit-analytics/cit-analytics.component';
import { HumanRepComponent } from './human-rep/human-rep.component';
import { GisComponent } from './gis/gis.component';
import { DatabaseviewComponent } from './databaseview/databaseview.component';
import { MergedataComponent } from './mergedata/mergedata.component';
import { GisAnalyticsComponent } from './gis-analytics/gis-analytics.component';
import { UnsualmovementsComponent } from './unsualmovements/unsualmovements.component';
import { AnomaliesComponent } from './anomalies/anomalies.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SourceViewComponent } from './source-view/source-view.component';
// import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path:'login',component:LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'admin',component:AdminComponent},
  {path:'users',component:UsersComponent},
  {path:'databases',component:DatabasesComponent},
  {path:'seeker-analytics',component:SeekerAnalyticsComponent},
  {path:'human-int-analytics',component:HumanIntAnalyticsComponent},
  {path:'cit-analytics',component:CitAnalyticsComponent},
  {path:'human-rep',component:HumanRepComponent},
  {path:'gis',component:GisComponent},
  {path:'databaseview',component:DatabaseviewComponent},
  {path:'mergedata',component:MergedataComponent},
  {path:'gis-analytics',component:GisAnalyticsComponent},
  {path:'unsualmovements',component:UnsualmovementsComponent},
  {path:'anomalies',component:AnomaliesComponent},
  {path:'analytics',component:AnalyticsComponent},
  {path:'source-view',component:SourceViewComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
