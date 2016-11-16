import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { RoomComponent } from './room.component';
import { MessagesService } from './messages.service';

@NgModule({
	imports: [
		CommonModule,
		MessagesRoutingModule
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
