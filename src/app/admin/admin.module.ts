import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent }   from './admin.component';

import { MenuModule } from '../common';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		MenuModule
	],
	exports: [],
	declarations: [
		AdminComponent
	],
	providers: [],
})
export class AdminModule { }
