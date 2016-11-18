import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MessagesService } from './messages.service';
import { Message } from './message';

import { UserService, ErrorService } from '../../common';

@Component({
	selector: 'messages-room',
	templateUrl: 'room.component.html'
})
export class RoomComponent implements OnInit {
	messages: Message[];
	loading = true;
	content: string;
	roomId: string;

	constructor(private service: MessagesService, private userService: UserService, private route: ActivatedRoute, private errorService: ErrorService) { }


	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => {
				this.roomId = params['id'];
				return this.service.getMessagesByRoomId(params['id'])
			})
			.subscribe(messages => {
				this.loading = false;
				this.messages = messages
			});
	}

	createMessage(event: Event): void {
		if (!this.content) return;

		this.errorService.hide();

		var item: Message = new Message();
		item.author = this.userService.getCurrentUser();
		item.content = this.content;
		
		this.service.createMessage(this.roomId, item).subscribe(
			() => {
				this.content = '';
				this.messages.push(item);
			},
			error => {
				this.errorService.showErrorResponse(error, event, 'Ошибка при создании сообщения');
			}
		);
	}
}