import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NewsService } from './news.service';
import { NewsItem } from './news-item';

@Injectable()
export class NewsResolve implements Resolve<NewsItem[]> {

	constructor(private newsService: NewsService) { }

	resolve(route: ActivatedRouteSnapshot) {
		let path: Array<string> = new Array<string>();
		let paths: Array<any> = route.pathFromRoot;
		for (let i = 0; i < paths.length; i++) {
			let urls: Array<any> = paths[i].url;
			if (!urls.length) continue;
			path.push(urls[0].path);
		}
		return this.newsService.getNews(0, 10);
	}
}