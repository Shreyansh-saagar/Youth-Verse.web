import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(ActivatedRoute);
  post = inject(PostService);
  route = inject(Router);
  postId: any;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      related: ['', Validators.required],
      topics: ['', Validators.required]
    });

    this.router.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.postId = postId;
      this.post.getSinglePost(postId).subscribe({
        next: (res) => {
          const post = Object.values(res)[0];
          this.editForm.patchValue({
            title: post.title,
            desc: post.desc,
            related: post.related,
            topics: post.topics
          });
        },
        error: () => {
          console.log('error fetching post');
        }
      });
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.editForm.get('title')?.value);
    formData.append('desc', this.editForm.get('desc')?.value);
    formData.append('related', this.editForm.get('related')?.value);
    formData.append('topics', this.editForm.get('topics')?.value);

    this.post.editPost(this.postId, formData).subscribe({
      next: (res) => {
        console.log('Update successful', res);
        // this.route.navigate(['/']);  // Optionally navigate to another page
      },
      error: (err) => {
        console.error('Error updating post', err);
        // Optionally show an error message
      }
    });
  }
}
