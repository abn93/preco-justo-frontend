import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  imports: [CommonModule, FormsModule], // Importa módulos necessários
  standalone: true,
})
export class CommentsComponent implements OnInit {
  @Input()
  postId!: number;
  comments: any[] = [];
  newComment: any = { postId: null, body: '', email: '' };

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.postId) {
      this.commentsService
        .getCommentsByPostId(this.postId)
        .subscribe((comments) => {
          this.comments = comments;
        });
    }
  }

  addComment(): void {
    this.newComment.postId = this.postId;
    this.commentsService.createComment(this.newComment).subscribe((comment) => {
      this.comments.push(comment);
      this.newComment.body = '';
      this.newComment.email = '';
    });
  }

  editComment(comment: any): void {
    comment.isEditing = true;
  }

  updateComment(comment: any): void {
    this.commentsService.updateComment(comment).subscribe((updatedComment) => {
      const index = this.comments.findIndex((c) => c.id === updatedComment.id);
      this.comments[index] = updatedComment;
      delete this.comments[index].isEditing;
    });
  }

  deleteComment(commentId: number): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }
}
