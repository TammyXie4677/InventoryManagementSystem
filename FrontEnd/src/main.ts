import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { RegisterFormComponent } from './app/register-form/register-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { authInterceptor } from './app/auth.interceptor'; 
import { ProductsComponent } from './app/products/products.component';
import { OrdersComponent } from './app/orders/orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: {
      debug: () => {
        console.log('Navigating to OrdersComponent');
        return true;
      },
    },
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])) 
  ],
}).catch((err) => console.error(err));

