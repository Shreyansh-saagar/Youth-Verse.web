import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { posts } from '../../../posts.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  router=inject(ActivatedRoute)
  route=inject(Router)
  auth=inject(AuthService)
  post = inject(PostService)
  postDetail:any;
  error:any;
  ngOnInit(): void {
      this.router.paramMap.subscribe((params)=>{
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



  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.post.deletePost(postId).subscribe({
        next: (res) => {
          console.log('Delete successful', res);
          this.route.navigate(['/blog']); // Navigate to another page after deletion
        },
        error: (err) => {
          console.error('Error deleting post', err);
        }
      });
    }
  }
}
