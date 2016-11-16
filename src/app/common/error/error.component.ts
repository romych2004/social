import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorService } from './error.service';
import { AppError } from './error';

import { SemanticPopupComponent } from 'ng-semantic';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    @ViewChild("popupError") popupError: SemanticPopupComponent;
    lastError: AppError;
    isShow = false;

    constructor(private errorService: ErrorService) { }

    ngOnInit() {
        let timeout = null;
        this.errorService.getLastError().subscribe((error: AppError) => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            if (error != null) {                
                if (this.isShow) { // если все еще показывается, то откладываем на 300млс показ
                    setTimeout(() => this.showError(error), 300);
                } else {
                   this.showError(error);
                }

                timeout = setTimeout(() => this.errorService.hide(), 15000); // через 15 секунд в любом случае выключаем
            } else {
                // если есть что прятать - то прячем
                this.popupError.hide();
                if(this.isShow) setTimeout(() => this.isShow = false, 300);
            }
        });
    }

    private showError(error) {
        this.lastError = error;
        this.isShow = true;
        setTimeout(() => this.popupError.show(this.lastError.event, { on: 'manual' })); // чтобы сначала посчитал контент, а только потом показывал. Иначе съезжает
    }
}