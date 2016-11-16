import { User } from '../../common';
import { Message } from './message';

export class MessagesRoom {
	members: Array<User>;
	membersCount:number = 0;

	messages: Array<Message>;
	lastMessage: Message;
}