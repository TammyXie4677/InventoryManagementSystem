import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
      this.isRegisterPage = this.router.url === '/register';
    });
  }
}
