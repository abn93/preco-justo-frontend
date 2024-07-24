import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostsComponent } from './components/posts/posts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, PostsComponent],

  standalone: true,
})
export class AppComponent {
  title = 'angular-crud-posts';
}
