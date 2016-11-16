import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { ErrorService } from '../error/error.service';



@Injectable()
export class LikeService {
	private url = 'api/like';
	private headers = new Headers({ 'Content-Type': 'application/json' });
	constructor(private http: Http, private userService: UserService, private errorService: ErrorService) { }

	toggleLike(item: any): Observable<boolean> {
		if (item.likedByMe) {
			return this.removeLike(item);
		} else {
			return this.addLike(item);
		}
	}

	addLike(item: any): Observable<boolean> {
		if (!item || !item.id) return;
		if (!item.likedByMe) {
			item.likesCount++;
			item.likedByMe = true;
		}

		return this.http.post(this.url, JSON.stringify({ parentId: item.id }), { headers: this.headers })
			.map((r: Response) => r.json().data).catch(this.errorService.handleError);
	}

	removeLike(item: any): Observable<boolean> {
		if (!item || !item.id) return;

		if (item.likedByMe) {
			item.likesCount--;
			item.likedByMe = false;
		}

		return this.http.delete(this.url + '/' + item.id)
			.map((r: Response) => r.json().data).catch(this.errorService.handleError);
	}
}