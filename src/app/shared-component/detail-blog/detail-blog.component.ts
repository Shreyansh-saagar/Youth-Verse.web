import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { posts } from '../../../posts.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-blog.component.html',
  styleUrl: './detail-blog.component.css'
})
export class DetailBlogComponent implements OnInit{
  posts = posts;
  route=inject(ActivatedRoute)
  postId:any;
  postDetail:any;
  error:any;
  ngOnInit(): void {
      this.route.paramMap.subscribe((params)=>{
        this.postId = params.get('id')
        const parameter = this.posts.find((post)=>(post.id === +this.postId));
        if(parameter){
          this.postDetail = parameter;
        }else{
          this.error='post not found'
        }
      })
  }

}
