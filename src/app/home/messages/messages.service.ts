import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MessagesRoom } from './room';
import { Message } from './message';

import { ErrorService } from '../../common';

@Injectable()
export class MessagesService {
	private url = 'api/message';
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http, private errorService: ErrorService) { }

	getRooms(start: number, count: number): Observable<MessagesRoom[]> {
		return this.http.get(this.url)
			.map((r: Response) => r.json().data as MessagesRoom[])
			.catch(this.errorService.handleError);;
	}

	getMessagesByRoomId(roomId:string): Observable<Message[]> {
		return this.http.get(this.url + '/' + roomId)
			.map((r: Response) => r.json().data as Message[])
			.catch(this.errorService.handleError);;
	}

	createMessage(roomId:string, item: Message): Observable<Message> {
		return this.http.post(this.url + '/' + roomId, JSON.stringify(item), { headers: this.headers })
			.map((r: Response) => {
				let result = r.json().data as Message;
				Object.assign(item, result);
				return result;
			})
			.catch(this.errorService.handleError);
	}
}