import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http.post<{name: string}>(
      'https://ng-complete-guide-bd60b.firebaseio.com/posts.json',
      postData
    ).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {}

  private fetchPosts() {
    this.http.get<{[key: string]: Post}>('https://ng-complete-guide-bd60b.firebaseio.com/posts.json')
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
      }))
      .subscribe((posts) => {
        this.loadedPosts = posts;
    });
  }
}
