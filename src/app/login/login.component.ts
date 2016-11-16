import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../common';


@Component({
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    
    
    constructor(
        private router: Router,
        private userService: UserService) { }
 
    ngOnInit() {
        // reset login status
        this.userService.logout();
    }
 
    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password).subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}