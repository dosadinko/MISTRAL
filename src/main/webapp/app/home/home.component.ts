import { Component, OnInit } from '@angular/core';
import {EventManager} from '@angular/platform-browser';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    firstName: string;
    lastName: string;
    username: string;
    email: string;

    constructor(
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
    }

    onFilterClick() {
        this.eventManager.broadcast({ name: 'filterChangedEvent', content: {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'username': this.username,
            'email': this.email
            }});
    }
}
