import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { RoomComponent } from './room.component';

const routes: Routes = [
    {
        path: '',
        component: MessagesComponent
    },
    {
        path: ':id',
        component: RoomComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessagesRoutingModule { }