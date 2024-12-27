// src/app/services/stripe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../config/env-config';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
 

  constructor(private readonly httpClient: HttpClient) {
    
  }


  getPosts(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL.GET_WORD_PRESS_INFO);
  }
 


}
