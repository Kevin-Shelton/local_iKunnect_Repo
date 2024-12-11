import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../config/env-config';
import { CreateDemo } from '../models/Demo';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(private readonly http: HttpClient) {}

  bookADemo(payload: CreateDemo): Observable<string> {
    return this.http.post<string>(`${API_URL.BOOK_DEMO}`, payload);
  }
}
