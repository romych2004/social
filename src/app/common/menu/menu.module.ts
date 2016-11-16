import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgSemanticModule } from 'ng-semantic';

import { SemanticStickyComponent } from '../ng-semantic/sticky.component';

import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		NgSemanticModule
	],
	exports: [
		MenuComponent
	],
	declarations: [
		MenuComponent,
		SemanticStickyComponent
	],
	providers: [
		MenuService
	]
})
export class MenuModule { }
