import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard'; // We will create this below

export const routes: Routes = [
  // 1. Default path redirects to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. Public route
  { path: 'login', component: LoginComponent },
  
  // 3. Protected route (can't enter without login)
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard] 
  },

  // 4. Wildcard (optional: back to login if page not found)
  { path: '**', redirectTo: 'login' }
];