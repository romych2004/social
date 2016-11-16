import { ElementRef, Directive, AfterViewInit } from '@angular/core';

@Directive({
    selector: 'div[html-content], div.html-content'
})
export class HTMLContentDirective implements AfterViewInit {

    constructor(public element: ElementRef) {
    }

    ngAfterViewInit() {
        this.element.nativeElement.innerHTML = this.element.nativeElement.innerHTML.replace(/(\r\n)|(\n)/g, '<br />');
    }
}
