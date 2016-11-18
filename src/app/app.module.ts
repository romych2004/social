import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { NgSemanticModule } from 'ng-semantic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';

import { AppService } from './app.service';

import { MenuModule, UserService, HeaderComponent, SemanticHeaderComponent, MenuService, ErrorComponent, ErrorService, LikeService } from './common';

import { NewsService } from './home/news/news.service';

// #R auth
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/registration.component';

import { Animations } from './animations';
// used to create fake backend
//import { fakeBackendProvider } from './auth/fake-backend';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        AppRoutingModule,

        MenuModule,
        HomeModule,
        NgSemanticModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        SemanticHeaderComponent,
        ErrorComponent
    ],
    providers: [
        ErrorService,
        AppService,
        UserService,
        LikeService,
        NewsService,
        Animations,
        // #R auth
        AuthGuard
        // #R providers used to create fake backend
        /*fakeBackendProvider,
        MockBackend,
        BaseRequestOptions*/
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
