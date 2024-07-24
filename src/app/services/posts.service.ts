import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post).pipe(catchError(this.handleError));
  }

  updatePost(post: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${post.id}`, post)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
