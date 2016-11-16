import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppError } from './error';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {
    private lastError = new BehaviorSubject<AppError>(null);

    constructor() {

    }

    getLastError(): BehaviorSubject<AppError> {
        return this.lastError;
    }

    hide(): void {
        this.lastError.next(null);
    }

    show(text: string, event: Event, title?: string): void {
        this.lastError.next(new AppError(text, event, title));
    }

    showErrorResponse(error: Response, event: Event, text: string): void {
        this.lastError.next(new AppError(text, event, error.statusText + ' (' + error.status + ')'));
    }

    handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}