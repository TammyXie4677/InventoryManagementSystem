import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true; 
    }
    this.router.navigate(['/login']); 
    return false;
  };
}
