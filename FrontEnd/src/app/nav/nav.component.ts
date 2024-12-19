import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn = false; 
  userName: string | null = null; 

  constructor(private router: Router) {}

  setLoginStatus(status: boolean, userName: string | null = null) {
    this.isLoggedIn = status;
    this.userName = userName;
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = null;
    console.log('User logged out');
    this.router.navigate(['/']); 
  }
}
