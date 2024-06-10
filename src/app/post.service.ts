import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;
  imgBaseUrl = environment.imgDomain;
  singlePost: any;
  allPost: any;
  isAuthenticated: boolean = false;
  constructor() {}

  createPost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, formData, {
      withCredentials: true,
    });
  }

  getAllPost(){
    return this.http.get(this.baseUrl + '/post')
  }

  getSinglePost(id:any){
    return this.http.get(this.baseUrl + '/post/'+id)
  }

  editPost(id: any, updatePost: FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}/post/update/${id}`, updatePost, {
      withCredentials: true,
    });
  }

}
