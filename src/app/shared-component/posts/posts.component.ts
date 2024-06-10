import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { posts } from '../../../posts.model';
import { CommonModule } from '@angular/common';
import { PostService } from '../../post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  posts = inject(PostService)
  ngOnInit(): void {
      this.posts.getAllPost().subscribe({
        next:(res)=>{
          this.posts.allPost = Object.values(res)[0];
        },error:()=>{
          console.log('error post component');
          
        }
      })
  }
}
