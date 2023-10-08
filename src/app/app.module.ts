import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@hudsontavares/agm-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { DatabasesComponent } from './databases/databases.component';
import { SeekerAnalyticsComponent } from './seeker-analytics/seeker-analytics.component';
import { HumanIntAnalyticsComponent } from './human-int-analytics/human-int-analytics.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { CitAnalyticsComponent } from './cit-analytics/cit-analytics.component';
import { HumanRepComponent } from './human-rep/human-rep.component';
import { GisComponent } from './gis/gis.component';
import { DatabaseviewComponent } from './databaseview/databaseview.component';
import { SourcedataviewComponent } from './sourcedataview/sourcedataview.component';
import { MergedataComponent } from './mergedata/mergedata.component';
import { AnomaliesComponent } from './anomalies/anomalies.component';
import { UnsualmovementsComponent } from './unsualmovements/unsualmovements.component';
import { GisAnalyticsComponent } from './gis-analytics/gis-analytics.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SourceViewComponent } from './source-view/source-view.component';
import { MarkersComponent } from './markers/markers.component';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { environment } from './environments/environment';
import { DeleteCollectionDialogComponent } from './delete-collection-dialog/delete-collection-dialog.component';
// import {} from 'googlemaps';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
    HomeComponent,
    AdminComponent,
    UsersComponent,
    DatabasesComponent,
    SeekerAnalyticsComponent,
    HumanIntAnalyticsComponent,
    CitAnalyticsComponent,
    HumanRepComponent,
    GisComponent,
    DatabaseviewComponent,
    SourcedataviewComponent,
    MergedataComponent,
    UnsualmovementsComponent,
    AnomaliesComponent,
    UnsualmovementsComponent,
    GisAnalyticsComponent,
    AnalyticsComponent,
    SourceViewComponent,
    MarkersComponent,
    SearchComponent,
    MapComponent,
    DeleteCollectionDialogComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    NgProgressModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // var app = angular.module('mapApp', []);

 }
