import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSemanticModule } from 'ng-semantic';
import { FormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';
import { NewsResolve } from './news-resolve';

import { CommonModule as AppCommonModule } from '../../common';

@NgModule({
	imports: [
		CommonModule,
		NgSemanticModule,
		FormsModule,
		AppCommonModule,
		NewsRoutingModule
	],
	exports: [],
	declarations: [
        NewsComponent
	],
	providers: [
		NewsResolve
	]
})
export class NewsModule { }
