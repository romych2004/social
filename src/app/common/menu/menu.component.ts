import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MenuItem } from './menu-item';

@Component({
	selector: 'menu',
	templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
	@Input() styleClass = '';
	@Input() items: MenuItem[];

	ngOnInit(): void {
        
    }
}