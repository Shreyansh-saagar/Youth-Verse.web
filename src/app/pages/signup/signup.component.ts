import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../shared-component/header/header.component';
import { AuthService } from '../../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  auth = inject(AuthService);
  router = inject(Router);
  
  @ViewChild('signup') signup!: NgForm;
  checkSignup() {
    if (this.signup.valid) {
      console.log('Form data:', this.signup.value); // Log form data
      this.auth.signupAuth(this.signup.value).subscribe({
        next: (res) => {
          console.log('Signup successful:', res); // Log success response
          this.signup.reset();
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error('Error during signup:', error); // Log error response
        }
      });
    } else {
      console.error('Form is invalid'); // Log invalid form state
    }
  }
}
