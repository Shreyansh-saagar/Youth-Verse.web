import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component').then((c) => c.FaqComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    canActivate:[authGuard]
  },
  {
    path: 'post-detail/:id',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then(
        (c) => c.PostDetailComponent
      ),
  },
  { 
    path: 'create-post',
    loadComponent: () =>
      import('./pages/create-post/create-post.component').then(
        (c) => c.CreatePostComponent
      ),
      canActivate:[authGuard]
  },
  {
    path: 'edit-post/:id',
    loadComponent: () =>
      import('./pages/edit-post/edit-post.component').then(
        (c) => c.EditPostComponent
      ),canActivate:[authGuard]
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
