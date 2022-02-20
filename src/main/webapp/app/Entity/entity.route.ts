import {StatusComponent} from './status/status.component';
import {Route} from '@angular/router';
import {PermissionComponent} from './permission/permission.component';
import {MistralUserModifyComponent} from './mistral-user/mistral-user-modify/mistral-user-modify.component';
import {UserPermissionComponent} from './user-permission/user-permission.component';
import {DeleteUserPopupDialogComponent} from './mistral-user/delete-user-popup/delete-user-popup.component';

export const ENTITY_ROUTES: Route[] = [
    {
        path: 'statuses',
        component: StatusComponent,
        data: {
            authorities: [],
            pageTitle: 'Statuses'
        }
    },
    {
        path: 'permissons',
        component: PermissionComponent,
        data: {
            authorities: [],
            pageTitle: 'Permissions'
        }
    },
    {
        path: 'user-permissions/user/:id',
        component: UserPermissionComponent,
        data: {
            authorities: [],
            pageTitle: 'User permissions'
        }
    },
    {
        path: 'modify-user/:id',
        component: MistralUserModifyComponent,
        data: {
            authorities: [],
            pageTitle: 'Modify user'
        }
    },
    {
        path: 'modify-user',
        component: MistralUserModifyComponent,
        data: {
            authorities: [],
            pageTitle: 'Modify user'
        }
    }
];

export const popupRoutes: Route[] = [
    {
        path: 'user/:id/delete',
        component: DeleteUserPopupDialogComponent,
        data: {
            pageTitle: 'Delete-user'
        },
        outlet: 'popup'
    }
];
