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
  selectedPost: any = null;
  viewCommentsPost: any = null;
  commentsVisible: { [key: number]: boolean } = {}; // Objeto para controlar a visibilidade dos comentários
  newPost: any = { title: '', body: '' };

  showModal = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
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
    });
  }

  savePost(post?: any): void {
    if (post) {
      this.postsService.updatePost(post).subscribe((updatedPost) => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts[index] = updatedPost;
        this.selectedPost = null;
      });
    } else {
      console.log(this.newPost);
      this.postsService.createPost(this.newPost).subscribe((post) => {
        this.posts.push(post);
        this.selectedPost = null;
        this.showModal = false;
      });
    }
  }

  createPost(): void {
    this.showModal = true;
  }

  cancelEdit(): void {
    this.selectedPost = null;
  }

  toggleComments(post: any): void {
    this.viewCommentsPost = post;

    this.commentsVisible[post.id] = !this.commentsVisible[post.id];
    if (
      this.viewCommentsPost?.id === post.id &&
      !this.commentsVisible[post.id]
    ) {
      this.viewCommentsPost = null;
    }
  }
}
