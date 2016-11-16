import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {
    public token: string;
    private currentUserBehavior = new BehaviorSubject<User>(null);
    private currentUser: User;

    constructor(private http: Http, private router: Router) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.token = currentUser.token;
            this.getCurrentUserHTTP().subscribe(user => {
                this.setCurrentUser(user);
            });
        } else {
            if (this.currentUser == null) {
                this.currentUser = new User();
                this.currentUser.id = 'user-1';
                this.currentUser.fullName = 'Roman';
                this.currentUser.username = 'romych';
                this.setCurrentUser(this.currentUser);
            }
        }


    }

    loggedIn(): boolean {
        return localStorage.getItem('currentUser') != null;
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
        this.currentUserBehavior.next(user);
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    getCurrentUserBehavior(): BehaviorSubject<User> {
        return this.currentUserBehavior;
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json().data);
    }

    getById(id: string) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json().data);
    }

    getCurrentUserHTTP() {
        return this.http.get('/api/currentUser', this.jwt()).map((response: Response) => response.json().data);
    }

    create(user: any) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json().data);
    }

    update(user: any) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json().data);
    }

    delete(id: string) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json().data);
    }



    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        return new RequestOptions({ headers: headers });
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/auth', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                let token = response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    let user = response.json().data;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, id: user.id }));
                    this.setCurrentUser(user);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.token = null;
        this.setCurrentUser(null);
        this.router.navigate(['/login']);
    }
}