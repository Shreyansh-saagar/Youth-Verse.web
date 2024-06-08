import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../../shared-component/posts/posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CommonModule,PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
