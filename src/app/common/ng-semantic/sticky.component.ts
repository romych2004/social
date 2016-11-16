import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

declare var jQuery: any;

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'my-sm-sticky',
	template: `
	<div class="ui sticky {{styleClass}}" #stickyEl>
		<ng-content></ng-content>
	</div>`
})
export class SemanticStickyComponent implements AfterViewInit, OnInit {
	@Input() styleClass: string;
	@Input() options: {};
	@ViewChild("stickyEl") stickyEl: ElementRef;
	private created = false;

	constructor(private router: Router) { }

	ngOnInit() {
		this.router.events.subscribe(event => {
			if(event instanceof NavigationEnd) {
				//debugger;
				//this.refresh();
			}
		});	
	}
	
	refresh() {
		if(!this.created) return;
		jQuery(this.stickyEl.nativeElement).sticky('refresh');
	}


	create() {
		jQuery(this.stickyEl.nativeElement).sticky(this.options || {});
		this.created = true;
	}



	ngAfterViewInit() {
		this.create();
		this.refresh();
		// setTimeout(() => {
			
		// 	this.refresh();
		// }, 500);
	}
}