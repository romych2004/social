import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSemanticModule } from 'ng-semantic';

import { AutosizeTextareaDirective } from '../../common';
import { HTMLContentDirective } from '../../common';

import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';
import { NewsResolve } from './news-resolve';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NewsRoutingModule,
		NgSemanticModule
	],
	exports: [],
	declarations: [
        NewsComponent,
		AutosizeTextareaDirective,
		HTMLContentDirective
	],
	providers: [
		NewsResolve
	]
})
export class NewsModule { }
