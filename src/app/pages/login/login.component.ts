import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
