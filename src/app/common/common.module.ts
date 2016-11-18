import { NgModule } from '@angular/core';

import { AutosizeTextareaDirective } from './autosize-textarea.directive';
import { HTMLContentDirective } from './html-content.directive';

@NgModule({
	imports: [],
	exports: [
		AutosizeTextareaDirective,
		HTMLContentDirective
	],
	declarations: [
		AutosizeTextareaDirective, 
		HTMLContentDirective
	],
	providers: [],
})
export class CommonModule { }
