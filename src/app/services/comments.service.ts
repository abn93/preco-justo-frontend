import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?postId=${postId}`)
      .pipe(catchError(this.handleError));
  }

  createComment(comment: any): Observable<any> {
    return this.http
      .post(this.apiUrl, comment)
      .pipe(catchError(this.handleError));
  }

  updateComment(comment: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${comment.id}`, comment)
      .pipe(catchError(this.handleError));
  }

  deleteComment(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
