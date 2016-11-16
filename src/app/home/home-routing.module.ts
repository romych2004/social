import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'news',
                pathMatch: 'full'
            },
            {
                path: 'news',
                loadChildren: './news/news.module#NewsModule'
            },
            {
                path: 'messages',
                loadChildren: './messages/messages.module#MessagesModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }