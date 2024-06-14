import { Routes } from '@angular/router';
import { authGuardGuard } from './services/guard/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix'
    },
    {
        path: 'login',
        loadComponent : ()=> import("./pages/login/login.component").then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent : ()=> import("./pages/register/register.component").then(c => c.RegisterComponent)
    },
    {
        path: 'activate-account',
        loadComponent : ()=> import("./pages/activate-account/activate-account.component").then(c => c.ActivateAccountComponent)
    },
    {
        path: 'books',
        loadChildren : ()=> import("./modules/book.routes").then(routes => routes.bookRoutes),
        canActivate: [authGuardGuard]
    }


];
