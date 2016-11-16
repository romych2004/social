import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import '../../common/rxjs';

import { MessagesService } from './messages.service';
import { Message } from './message';

@Component({
	selector: 'messages-room',
	templateUrl: 'room.component.html'
})
export class RoomComponent implements OnInit {
	messages: Message[];
	loading = true;

	constructor(private service: MessagesService, private route: ActivatedRoute) { }


	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.service.getMessagesByRoomId(params['id']))
			.subscribe(messages => {
				this.loading = false;
				this.messages = messages
			});
	}
}