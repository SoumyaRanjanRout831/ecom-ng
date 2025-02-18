import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  // private apiUrl = 'http://localhost:3000/category';


  private apiUrl = `${environment.apiUrl}/product`;

  private http = inject(HttpClient);

  constructor() {}

  getAllBrand(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { responseType: 'json' });
  }

  addBrand(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }

  editBrand(id: string | null, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
