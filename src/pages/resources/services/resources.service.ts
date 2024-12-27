// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../config/env-config';
import { Category, PostInfo } from '../models/wordpress-models';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {

  constructor(private readonly httpClient: HttpClient) {}

  getAllCategies(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL.GET_WP_CATEGORIES}`);
  }
 
  getPostsByCategory(categoryId: number): Observable<PostInfo[]> {
    return this.httpClient.get<PostInfo[]>(API_URL.GET_WP_POSTS_BY_CATEGORY(categoryId));
  }


}
