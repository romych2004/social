import { OnInit, Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MenuComponent } from '../common';
import { MenuItem } from '../common';

import { MenuService } from '../common';

@Component({
    selector: 'admin',
    template: `
    ADMIN COMPONENT
    <a routerLink="/home">Open Home</a>

    <menu [items]="menuItems"></menu>
    <router-outlet></router-outlet>
    `
})
export class AdminComponent implements OnInit {
    menuItems: MenuItem[];

    constructor(private service: MenuService) {

    }

    ngOnInit(): void {
        this.service.getAdminItems().subscribe(
            items => this.menuItems = items, 
            errors => {
                console.log(errors)
                return Observable.of<MenuItem[]>([]);
            }
        );
    }
}