import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserService, ErrorService } from '../../common';

import { NewsItem } from './news-item';



@Injectable()
export class NewsService {
	private url = 'api/news';
	private headers = new Headers({ 'Content-Type': 'application/json' });

	private parentIds: Array<string> = new Array<string>();

	constructor(private http: Http, private userService: UserService, private route: ActivatedRoute, private errorService: ErrorService) {
	}

	addParentId(type:string) {
		this.parentIds.push(type);
	}

	removeParentId(type: string) {
		while(this.parentIds.length) {
			if(this.parentIds.pop() == type) return;
		}
	}

	getNews(start: number, count: number, parentId?: string): Observable<NewsItem[]> {
		let id = parentId ? parentId : this.parentIds[this.parentIds.length - 1];
		return this.http.get(this.url + '/' + id)
			.map((r: Response) => r.json().data as NewsItem[])
			.catch(this.errorService.handleError);;
	}

	create(item: NewsItem, parentId?: string) {
		let id = parentId ? parentId : this.parentIds[this.parentIds.length - 1];
		return this.http.post(this.url + '/' + id, JSON.stringify(item), { headers: this.headers })
			.map((r: Response) => {
				let result = r.json().data as NewsItem;
				Object.assign(item, result);
				return result;
			})
			.catch(this.errorService.handleError);;
	}


	/*getHero(id: number): Promise<Hero> {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
			.put(url, JSON.stringify(hero), { headers: this.headers })
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, { headers: this.headers })
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http
			.post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}*/
}
