import { OnInit, Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import '../styles.css';

import { ErrorService } from './common';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


    constructor(private router: Router, private errorService: ErrorService) {

    }

    ngOnInit(): void {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event) => {
                this.errorService.hide();
            });
    }
}