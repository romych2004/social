import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// #R auth
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/registration.component';

const routes:Routes = [
	{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }, 
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
