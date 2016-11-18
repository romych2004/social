import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { UserService, User, AppError, ErrorService, LikeService } from '../../common';
import { NewsService } from './news.service';

import { NewsItem } from './news-item';
/*import { Animations } from '../../animations';*/

@Component({
	selector: 'news',
	templateUrl: 'news.component.html',
	styleUrls: ['news.component.css']/*,
    animations: Animations.page,
    host: { '[@routeAnimation]': 'true' }*/
})
export class NewsComponent implements OnInit {
	items: NewsItem[];
	buttonClass: string;

	content: string;
	loading = false;

	constructor(private service: NewsService,
		private userService: UserService,
		private errorService: ErrorService,
		private likeService: LikeService) { }

	ngOnInit() {
		this.loading = true;
		//this.items = this.route.snapshot.data['news-items'];
		this.service.getNews(0, 10).subscribe(
			items => {
				this.loading = false;
				this.items = items;
			},
			error => {
				console.log(error);
				/*return Observable.of<NewsItem[]>([]);*/
			}
		);
		this.updateButtonClass(false);
	}


	createNews(event: Event): void {
		if (!this.content) return;
		this.updateButtonClass(true);

		this.errorService.hide();

		var item: NewsItem = new NewsItem();
		item.author = this.userService.getCurrentUser();
		item.content = this.content;

		this.service.create(item).subscribe(
			() => {
				this.content = '';
				this.items.splice(0, 0, item);
				this.updateButtonClass(false);
			},
			error => {
				this.errorService.showErrorResponse(error, event, 'Ошибка при добавлении новости');
				this.updateButtonClass(false);
			}
		);
	}

	updateButtonClass(loading: boolean): void {
		let classes = ['positive'];
		if (loading) classes.push('loading');
		this.buttonClass = classes.join(' ');
	}


	toggleLike(item: NewsItem, event) {
		this.likeService.toggleLike(item).subscribe();
	}
}