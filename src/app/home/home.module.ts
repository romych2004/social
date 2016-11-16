import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSemanticModule } from 'ng-semantic';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MenuModule } from '../common';

import { NewsModule } from './news/news.module'; 

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		NewsModule,
		MenuModule,
		NgSemanticModule
	],
	exports: [],
	declarations: [
		HomeComponent
	],
	providers: [
	]
})
export class HomeModule { }
