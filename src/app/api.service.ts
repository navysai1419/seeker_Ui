import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }
 
  uploadFile(file: File, collectionName: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('collectionName', collectionName);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.baseUrl}/api/upload-csv`, formData, { headers });
  }
  
  deleteCollection(collectionName: string) {
    const url = `${this.baseUrl}/api/delete-collection/${collectionName}`;
    return this.http.delete(url);
  }


  getCsvData(collectionName: string): Observable<any[]> {
    return  this.http.get<any[]>(`${this.baseUrl}/api/metadata?collectionName=${collectionName}`);
  }
  addHeaderToCSV(collectionName: string, newHeader: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('newHeader', newHeader); // Include the newHeader parameter

    return this.http.put<string>(
      `${this.baseUrl}/api/add-header/${collectionName}`,
      null,
      { headers, params }
    );
  }
removeHeaderFromCSV(collectionName: string, headerToRemove: string): Observable<any> {
  const url = `${this.baseUrl}/api/remove-header/${collectionName}?headerToRemove=${headerToRemove}`;

  return this.http.put(url,null);
}
editHeaderInCSV(collectionName: string, oldHeader: string, newHeader: string): Observable<any> {
  const url = `${this.baseUrl}/api/edit-header/${collectionName}?oldHeader=${oldHeader}&newHeader=${newHeader}`;

  return this.http.put(url, null); 
}

retrieveCSVData(collectionName: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/retrieve-csv?collectionName=${collectionName}`);
}
}
