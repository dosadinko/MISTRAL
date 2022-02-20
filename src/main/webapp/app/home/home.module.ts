import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MistralSharedModule } from '../shared';

import {HOME_ROUTE, HomeComponent, ResolvePagingParams} from './';
import {MistralUserComponent} from '../Entity/mistral-user/mistral-user.component';
import {StatusComponent} from '../Entity/status/status.component';
import {PermissionComponent} from '../Entity/permission/permission.component';
import {UserPermissionComponent} from '../Entity/user-permission/user-permission.component';
import {MistralUserListComponent} from '../Entity/mistral-user/mistral-user-list/mistral-user-list.component';
import {MistralUserCardComponent} from '../Entity/mistral-user/mistral-user-card/mistral-user-card.component';
import {MistralUserService} from '../Entity/mistral-user/mistral-user.service';
import {FormsModule} from '@angular/forms';
import {ENTITY_ROUTES, popupRoutes} from '../Entity/entity.route';
import {StatusService} from '../Entity/status/status.service';
import {UserPermissionService} from '../Entity/user-permission/user-permission.service';
import {PermissionService} from '../Entity/permission/permission.service';
import {DeleteUserPopupComponent, DeleteUserPopupDialogComponent} from '../Entity/mistral-user/delete-user-popup/delete-user-popup.component';
import {ModalService} from '../shared/modal.service';
import {GenericModalComponent} from '../shared/generic-modal/generic-modal.component';

@NgModule({
    imports: [
        MistralSharedModule,
        FormsModule,
        RouterModule.forChild([HOME_ROUTE, ...ENTITY_ROUTES, ...popupRoutes]),
    ],
    declarations: [
        HomeComponent,
        MistralUserComponent,
        StatusComponent,
        PermissionComponent,
        UserPermissionComponent,
        MistralUserListComponent,
        MistralUserCardComponent,
        DeleteUserPopupDialogComponent,
        DeleteUserPopupComponent,
        GenericModalComponent
    ],
    entryComponents: [
        DeleteUserPopupDialogComponent,
        DeleteUserPopupComponent
    ],
    providers: [
        MistralUserService,
        StatusService,
        ResolvePagingParams,
        UserPermissionService,
        PermissionService,
        ModalService
    ],
    exports: [
        StatusComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MistralHomeModule {}
