import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSemanticModule } from 'ng-semantic';

import { CommonModule as AppCommonModule } from '../../common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { RoomComponent } from './room.component';
import { MessagesService } from './messages.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MessagesRoutingModule,
		NgSemanticModule,
		AppCommonModule
	],
	exports: [],
	declarations: [
        MessagesComponent,
		RoomComponent
	],
	providers: [
		MessagesService
	]
})
export class MessagesModule { }
