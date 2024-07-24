import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [AppComponent, PostsComponent, CommentsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [HttpClientModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
