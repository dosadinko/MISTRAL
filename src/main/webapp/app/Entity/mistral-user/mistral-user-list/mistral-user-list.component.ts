import {Component, OnDestroy, OnInit} from '@angular/core';
import {MistralUserService} from '../mistral-user.service';
import {LoggerService} from '../../../shared/logger-service';
import {Subject} from 'rxjs/Subject';
import {ResponseWrapper} from '../../../shared/response-wrapper';
import 'rxjs/add/operator/takeUntil';
import {MistralUserModel} from '../mistral-user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';

@Component({
    selector: 'jhi-mistral-user-list',
    templateUrl: './mistral-user-list.component.html',
    styles: []
})
export class MistralUserListComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    private mistralUsersList: MistralUserModel[] = [];
    private filters: {
        firstName: string,
        lastName: string,
        username: string,
        email: string,
    } = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    };

    predicate: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;

    constructor(
        private mistralUserService: MistralUserService,
        private logger: LoggerService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = 10;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        this.subscribeToEvents();
        this.loadUsers();
    }

    subscribeToEvents() {
        this.eventManager.subscribe('filterChangedEvent', (res) => {
           this.filters = res.content;
           this.loadUsers();
        });
        this.eventManager.subscribe('userDeletedEvent', () => {
            this.loadUsers();
        });
    }

    loadUsers() {
        this.mistralUserService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort(),
            'firstName.contains': this.filters.firstName ? this.filters.firstName : '',
            'lastName.contains': this.filters.lastName ? this.filters.lastName : '',
            'username.contains': this.filters.username ? this.filters.username : '',
            'email.contains': this.filters.email ? this.filters.email : '',
        })
            .takeUntil(this.unsubscribe)
            .subscribe((res: ResponseWrapper) => {
                this.onSuccess(res.json, res.headers);
            }, (err) => this.logger.onError(err));
    }

    onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.mistralUsersList = data;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(
            [],
            {
                queryParams:
                    {
                        page: this.page,
                        size: this.itemsPerPage,
                        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                    },
                relativeTo: this.activatedRoute
            }
        );
        this.loadUsers();
    }

    onDelete(id: number) {
        this.router.navigate([{outlets: {popup: 'user/' + id + '/delete'}}]);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
