import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { posts } from '../../../posts.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-blog.component.html',
  styleUrl: './detail-blog.component.css'
})
export class DetailBlogComponent implements OnInit{

  route=inject(ActivatedRoute)
  auth=inject(AuthService)
  post = inject(PostService)
  postDetail:any;
  error:any;
  ngOnInit(): void {
      this.route.paramMap.subscribe((params)=>{
        const postId = params.get('id');
        this.post.getSinglePost(postId).subscribe({
          next:(res)=>{
            this.postDetail = Object.values(res)[0]
          },
          error:()=>{
            console.log('details error');
            
          }
        })
      })
  }

}
