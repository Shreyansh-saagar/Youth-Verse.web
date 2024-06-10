import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/env';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = environment.domain;
  username: any;
  userId: any;
  isAuthenticated: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  checkAuth() {
    return this.http.get(this.baseUrl + '/auth/check', {
      withCredentials: true,
    });
  }

  signupAuth(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, formData, { withCredentials: true });
  }

  signinAuth(formData: any) {
    return this.http
      .post(this.baseUrl + '/auth/signin', formData, { withCredentials: true })
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(Object.values(res)[1]);
          if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('username',JSON.stringify(res))
          }
          this.router.navigate(['/'])          
        },
        error: () => {
          console.log('error at signin');
        },
      });
  }

  signOut() {
    console.log('Starting sign out process');
    return this.http.get(this.baseUrl + '/auth/logout', { withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Logout successful, clearing local storage');
          localStorage.removeItem('username');
          const currentRoute = this.router.url;
          if (currentRoute === '/') {
            window.location.reload();
          } else {
            this.router.navigate(['/']).then(() => window.location.reload());
          }
        },
        error: (err) => {
          console.log('Error in logout:', err);
        }
      });
  }
}
