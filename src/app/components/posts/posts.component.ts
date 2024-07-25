import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../post-form/post-form.component';
import { CommentsComponent } from '../comments/comments.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PostFormComponent,
    CommentsComponent,
    HttpClientModule,
  ],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  displayedPosts: any[] = [];
  selectedPost: any = null;
  viewCommentsPost: any = null;
  commentsVisible: { [key: number]: boolean } = {};
  newPost: any = {};

  showModal = false;
  postsToShow: number = 5;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      this.displayedPosts = this.posts.slice(0, this.postsToShow);
    });
  }

  loadMorePosts(): void {
    const nextIndex = this.displayedPosts.length + this.postsToShow;
    this.displayedPosts = this.posts.slice(0, nextIndex);
  }

  editPost(post: any): void {
    this.selectedPost = { ...post };
  }

  viewComment(post: any): void {
    this.selectedPost = { ...post };
  }

  deletePost(postId: number): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== postId);
      this.displayedPosts = this.posts.slice(0, this.displayedPosts.length);
    });
  }

  savePost(post: any): void {
    if (post.id) {
      this.postsService.updatePost(post).subscribe((updatedPost) => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts[index] = updatedPost;
        this.selectedPost = null;
        this.showModal = false;
        this.posts.sort((a, b) => b.id - a.id);
        this.displayedPosts = this.posts.slice(0, this.displayedPosts.length);
      });
    } else {
      this.postsService.createPost(this.newPost).subscribe((newPost) => {
        this.posts.push(newPost);
        this.selectedPost = null;
        this.showModal = false;
        this.posts.sort((a, b) => b.id - a.id);
        this.displayedPosts = this.posts.slice(0, this.displayedPosts.length);
      });
    }
  }

  createPost(): void {
    this.newPost = { title: '', body: '' };
    this.showModal = true;
  }

  cancelEdit(): void {
    this.selectedPost = null;
    this.showModal = false;
  }

  toggleComments(post: any): void {
    this.commentsVisible[post.id] = !this.commentsVisible[post.id];

    if (this.commentsVisible[post.id]) {
      this.viewCommentsPost = post;
    }
  }

  closeViewComments(): void {
    this.viewCommentsPost = null;
  }
}
