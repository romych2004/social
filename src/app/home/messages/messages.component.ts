import { Component, OnInit } from '@angular/core';

import { MessagesRoom } from './room';
import { MessagesService } from './messages.service';

@Component({
	selector: 'messages',
	templateUrl: 'messages.component.html'
})
export class MessagesComponent implements OnInit {
	rooms: MessagesRoom[];

	content: string;
	loading = false;

	constructor(private service: MessagesService) { }

	ngOnInit() {
		this.loading = true;
		this.service.getRooms(0, 30).subscribe(
			items => {
				this.loading = false;
				this.rooms = items;
			},
			error => {
				console.log(error);
			}
		);
	}
}