import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MessagesRoom } from './room';
import { Message } from './message';

@Injectable()
export class MessagesService {
	private url = 'api/message';
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }

	getRooms(start: number, count: number): Observable<MessagesRoom[]> {
		return this.http.get(this.url)
			.map((r: Response) => r.json().data as MessagesRoom[]);
	}

	getMessagesByRoomId(roomId:string): Observable<Message[]> {
		return this.http.get(this.url + '/' + roomId)
			.map((r: Response) => r.json().data as Message[]);
	}
}