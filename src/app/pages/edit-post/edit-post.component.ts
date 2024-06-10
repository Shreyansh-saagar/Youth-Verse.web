import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  auth = inject(AuthService)
  router = inject(ActivatedRoute)
  post = inject(PostService)
  route = inject(Router)
  postId:any
  @ViewChild('editPost') edit!: NgForm
  ngOnInit(): void {
      this.router.paramMap.subscribe((params)=>{
        const postId = params.get('id')
        this.postId = postId
        this.post.getSinglePost(postId).subscribe({
          next:(res)=>{
            this.post.singlePost=Object.values(res)[0]
          },error:()=>{
            console.log('error edit post');
          }
        })
      })
  }

  editForm(){
    const formData = new FormData();
    formData.append('title',this.edit.value.title)
    formData.append('desc',this.edit.value.desc)
    formData.append('related',this.edit.value.related)
    formData.append('topics',this.edit.value.topics)
    this.post.editPost(this.postId,formData);
    this.edit.resetForm();
    // this.route.navigate(['/']).then(()=>window.location.reload())
  }
}
