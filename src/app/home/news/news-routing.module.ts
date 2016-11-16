import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsResolve } from './news-resolve';

const routes: Routes = [
    {
        path: '',
        component: NewsComponent/*,
        resolve: {
            'news-items': NewsResolve
        }*/
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }