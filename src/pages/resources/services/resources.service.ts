// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../../../config/env-config';
import { AuthorInfo, Category, PostInfo } from '../models/wordpress-models';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly postsByCategory = new BehaviorSubject<PostInfo[]>([]);
  currentPostsByCategory = this.postsByCategory.asObservable();

  private readonly selectedPostInfo = new BehaviorSubject<PostInfo>(
    undefined as unknown as PostInfo
  );
  currentSelectedPostInfo = this.selectedPostInfo.asObservable();

  getAllCategies(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL.GET_WP_CATEGORIES}`);
  }

  getPostsByCategory(categoryId: number): Observable<PostInfo[]> {
    return this.httpClient.get<PostInfo[]>(
      API_URL.GET_WP_POSTS_BY_CATEGORY(categoryId)
    );
  }
  getPostAuthor(authorId: number): Observable<AuthorInfo> {
    return this.httpClient.get<AuthorInfo>(
      API_URL.GET_WP_POST_AUTHOR(authorId)
    );
  }

  changePostsByCategory(postInfo: PostInfo[]) {
    this.postsByCategory.next(postInfo);
  }

  changeSelectedPostInfo(postInfo: PostInfo) {
    this.selectedPostInfo.next(postInfo);
  }

  decodeHtmlEntity(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent || '';
  }
}
