import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/category';

  private http = inject(HttpClient)

  getCategories(): Observable<any>{
    return this.http.get<any>(this.apiUrl, { responseType: 'json' })
  }

  addCategory(body: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, body)
  }

  editCategory(id: string | null, body: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, body)
  }

  getCategoryById(id: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteCategory(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
