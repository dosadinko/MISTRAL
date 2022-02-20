import {Component} from '@angular/core';

@Component({
    selector: 'jhi-back-button',
    templateUrl: './back-button.component.html'
})
export class BackButtonComponent {

    constructor() {
    }

    goBack() {
        window.history.back();
    }
}
