import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from '../common';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate() {
        if (this.userService.loggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        return true;
       // this.router.navigate(['/login']);
        //return false;
       /* return this.userService.getCurrentUserBehavior().map(user => {
            // logged in so return true
            if(user != null) return true;

            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }).take(1);*/
/*
        // logged in so return true
        if (this.userService.getCurrentUser() != null) return true;

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;*/
    }
}