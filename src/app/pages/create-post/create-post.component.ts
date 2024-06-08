import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared-component/header/header.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule,HeaderComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  triggerFileUpload(){
    document.getElementById('image')?.click();
  }
}
