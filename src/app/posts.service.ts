import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
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
      }));
  }
}
