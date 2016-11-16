import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
	selector: 'header',
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
	user:User;

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getCurrentUserBehavior().subscribe(user => this.user = user);
	}

	logout() {
		this.userService.logout();
	}
}