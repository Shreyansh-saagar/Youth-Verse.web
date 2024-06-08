import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { DetailBlogComponent } from '../../shared-component/detail-blog/detail-blog.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule,HeaderComponent,DetailBlogComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {

}
