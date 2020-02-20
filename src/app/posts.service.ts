import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title,
      content
    };

    this.http.post<{name: string}>(
      'https://ng-complete-guide-bd60b.firebaseio.com/posts.json',
      postData
    ).subscribe((responseData) => {
      console.log(responseData);
    }, (error) => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-bd60b.firebaseio.com/posts.json')
      .pipe(map((responseData) => {
        const postsArray: Post[] = [];

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({
              id: key,
              ...responseData[key]
            });
          }
        }

        return postsArray;
      }), catchError((errorRes) => {
        return throwError(errorRes);
      }));
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-bd60b.firebaseio.com/posts.json');
  }
}
