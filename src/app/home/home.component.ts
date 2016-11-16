import { OnInit, Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MenuComponent } from '../common';
import { MenuItem } from '../common';
import { MenuService } from '../common';
import { NewsService } from './news';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
    menuItems: MenuItem[];

    constructor(private service: MenuService, private newsService: NewsService) {
    }

    ngOnInit(): void {
        this.newsService.addParentId('home');
        this.service.getHomeItems().subscribe(
            items => this.menuItems = items, 
            errors => {
                console.log(errors)
                return Observable.of<MenuItem[]>([]);
            }
        );
    }

	ngOnDestroy() {
        this.newsService.removeParentId('home');
	}
}