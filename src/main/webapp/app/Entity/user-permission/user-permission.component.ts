import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from '../../shared/logger-service';
import {UserPermissionService} from './user-permission.service';
import {takeUntil} from 'rxjs/operators';
import {ResponseWrapper} from '../../shared/response-wrapper';
import {UserPermissionModel} from './user-permission.model';
import {MistralUserService} from '../mistral-user/mistral-user.service';
import {MistralUserModel} from '../mistral-user/mistral-user.model';
import {PermissionService} from '../permission/permission.service';
import {PermissionModel} from '../permission/permission.model';

@Component({
    selector: 'jhi-user-permission',
    templateUrl: './user-permission.component.html',
    styles: []
})
export class UserPermissionComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    userId: number;

    userPermissionsList: UserPermissionModel[] =  [];
    permissionsList: PermissionModel[] = [];

    selectedUser: MistralUserModel = {};
    selectedPermission: number;

    assignFormOn = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private logger: LoggerService,
        private userPermissionService: UserPermissionService,
        private mistralUserService: MistralUserService,
        private permissionsService: PermissionService,
    ) {
        this.userId = this.activatedRoute.snapshot.params['id'] ? this.activatedRoute.snapshot.params['id'] : null;
    }

    ngOnInit() {
        this.userId ? this.loadUser() : null;
        this.loadPermissions();
    }

    loadUser() {
        this.mistralUserService.find(this.userId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res: MistralUserModel) => {
                this.selectedUser = res;
                this.loadUserPermissions(res.id);
            }, (err) => this.logger.onError(err));
    }

    loadUserPermissions(userId){
        this.userPermissionService.findByUserId(userId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res: ResponseWrapper) => {
                this.userPermissionsList = res.json;
            }, (err) => this.logger.onError(err));
    }

    loadPermissions(){
        this.permissionsService.query()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res: ResponseWrapper) => {
                this.permissionsList = res.json;
            }, (err) => this.logger.onError(err));
    }

    onAssignPermissionClick(){
        this.assignFormOn = !this.assignFormOn;
    }

    delete(id) {
        if (confirm('Are you sure?')) {
            this.userPermissionService.delete(id).subscribe(() => {
                this.loadUserPermissions(this.userId);
            }, (err) => this.logger.onError(err));
        }
    }

    onSaveClick() {
        const userPermissionForDB: UserPermissionModel = {};
        userPermissionForDB.mistralUserId = this.userId;
        userPermissionForDB.permissionId = this.selectedPermission;
        this.userPermissionService.create(userPermissionForDB)
            .subscribe((res) => {
                this.loadUserPermissions(res.mistralUserId);
            }, (err) => this.logger.onError(err));
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
