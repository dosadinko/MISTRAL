import {ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot} from '@angular/router';

import {HomeComponent} from './';
import {Injectable} from '@angular/core';
import {JhiPaginationUtil} from 'ng-jhipster';
import {DeleteUserPopupComponent, DeleteUserPopupDialogComponent} from '../Entity/mistral-user/delete-user-popup/delete-user-popup.component';
import {popupRoutes} from '../Entity/entity.route';

@Injectable()
export class ResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'MISTRAL'
    },
    resolve: {
        'pagingParams': ResolvePagingParams
    }
};
