// src/app/services/stripe.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  getPostsByCategory(
    categoryId: number,
    page: number = 1,
    perPage: number = 3
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('orderby', 'date')
      .set('order', 'desc');

    return this.httpClient
      .get<any>(API_URL.GET_WP_POSTS_BY_CATEGORY(categoryId), {
        params,
        observe: 'response',
      })
      .pipe(
        map(response => {
          // Extract headers
          const totalPosts = Number(response.headers.get('X-WP-Total')) || 0;
          const totalPages =
            Number(response.headers.get('X-WP-TotalPages')) || 1;

          // Return both posts and headers data
          return {
            posts: response.body,
            totalPosts: totalPosts,
            totalPages: totalPages,
          };
        })
      );
  }
  getPostAuthor(authorId: number): Observable<AuthorInfo> {
    return this.httpClient.get<AuthorInfo>(
      API_URL.GET_WP_POST_AUTHOR(authorId)
    );
  }

  getTrendingPosts(): Observable<any> {
    const params = {
      per_page: '3',
      order: 'desc',
      orderby: 'date',
    };

    return this.httpClient.get<any>(API_URL.TRENDING_POSTS, { params });
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
