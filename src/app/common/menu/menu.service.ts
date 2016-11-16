import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MenuItem } from './menu-item';

@Injectable()
export class MenuService {
	private url = 'api/menu';

	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) {

	}

	getHomeItems(): Observable<MenuItem[]> {
		return this.http.get(this.url + '/home')
			.map((r: Response) => {
				return r.json().data as MenuItem[];
			});
	}

	getAdminItems(): Observable<MenuItem[]> {
		return this.http.get(this.url + '/admin')
			.map((r: Response) => r.json().data as MenuItem[]);
	}
}
