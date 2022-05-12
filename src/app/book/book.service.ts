import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { BookDetail } from './book-detail';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //private apiUrl: string = environment.baseUrl + 'book';
  private apiUrl: string = environment.baseUrl + 'books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookDetail[]> {
    return this.http.get<BookDetail[]>(this.apiUrl).pipe(
      catchError(err=> throwError(() => new Error('error en el servicio')))
    )
  }

  getBook(id: string): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.apiUrl + "/" + id);
  }

}
