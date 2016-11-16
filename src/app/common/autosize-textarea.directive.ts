import { ElementRef, HostListener, Directive, AfterViewInit } from '@angular/core';

@Directive({
	selector: 'textarea[autosize]'
})
export class AutosizeTextareaDirective implements AfterViewInit {
	@HostListener('input', ['$event.target'])
	onInput(textArea: HTMLTextAreaElement): void {
		this.refresh();
	}

	constructor(public element: ElementRef) {
	}

	ngAfterViewInit() {
		this.refresh();
	}

	public refresh(): void {
		this.element.nativeElement.rows = this.element.nativeElement.value.split('\n').length;
		this.element.nativeElement.style.overflow = 'hidden';
		this.element.nativeElement.style.height = 'auto';
		this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
	}
}