import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8081'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  uploadExcelFile(sheetType: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name); // Add the file to the FormData
    formData.append('sheetType', sheetType); // Add the sheet type to the FormData

    return this.http.post<string>(`${this.baseUrl}/api/upload`, formData);

  }


 deleteExcelSheetsBySheetType(sheetType: string): Observable<any> {
        const url = `${this.baseUrl}/delete/${sheetType}`;
        return this.http.delete(url);
    }

  getExcelFile(id: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    return this.http.get(`${this.baseUrl}/api/excel/${id}`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
