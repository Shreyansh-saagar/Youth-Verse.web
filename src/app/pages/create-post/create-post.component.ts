import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  triggerFileUpload() {
    document.getElementById('image')?.click();
  }

  post = inject(PostService);
  router = inject(Router)
  selectedFile!: File;

  @ViewChild('createPost') create!: NgForm;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCreatePost() {
    const formData = new FormData();
    formData.append('title', this.create.value.title);
    formData.append('desc', this.create.value.desc);
    formData.append('related', this.create.value.related);
    formData.append('topics', this.create.value.topics);
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.post.createPost(formData).subscribe({
      next: (res) => {
        console.log('Post created:', res);
        this.create.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Post creation error:', error);
      }
    });
  }
}
