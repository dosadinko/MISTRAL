import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MistralUserService} from '../mistral-user.service';
import {LoggerService} from '../../../shared/logger-service';
import {Subject} from 'rxjs/Subject';
import {MistralUserModel} from '../mistral-user.model';

@Component({
    selector: 'jhi-mistral-user-modify',
    templateUrl: './mistral-user-modify.component.html',
    styles: []
})
export class MistralUserModifyComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    userId: number;
    isLoading: boolean = false;

    userForDB: MistralUserModel = {};
    passwordForDB: string;

    errorMsg: string[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private mistralUserService: MistralUserService,
        private logger: LoggerService,
    ) {
        this.userId = this.activatedRoute.snapshot.params['id'] ? this.activatedRoute.snapshot.params['id'] : null;
    }

    ngOnInit() {
        this.userId ? this.loadUser() : null;
    }

    loadUser() {
        this.isLoading = true;
        this.mistralUserService.find(this.userId)
            .takeUntil(this.unsubscribe)
            .subscribe((res: MistralUserModel) => {
                this.userForDB = res;
                this.isLoading = false;
            }, err => this.logger.onError(err));
    }

    onSaveClick() {
        this.userForDB.password = this.passwordForDB;
        this.validateFields();
    }

    validateFields() {
        const lowercaseLetter = new RegExp('.*[a-z]');
        const uppercaseLetter = new RegExp('.*[A-Z]');
        const nummericCharacter = new RegExp('.*[0-9]');
        const specialCharacter = new RegExp('.*[!@#$%^&*]');
        const length = new RegExp('.{8,32}');
        this.errorMsg = [];
        !this.userForDB.firstName ? this.errorMsg.push('First name is empty ') : null;
        !this.userForDB.lastName ? this.errorMsg.push('Last name is empty ') : null;
        if (!this.userId) {
            !this.userForDB.password ? this.errorMsg.push('Password is empty ') : null;
            !length.test(this.userForDB.password) ? this.errorMsg.push('Password must contain at least 8 letters') : null;
            !lowercaseLetter.test(this.userForDB.password) ? this.errorMsg.push('Password must contain at least one lowercase character ') : null;
            !uppercaseLetter.test(this.userForDB.password) ? this.errorMsg.push('Password must contain at least one uppercase character ') : null;
            !nummericCharacter.test(this.userForDB.password) ? this.errorMsg.push('Password must contain at least one number ') : null;
            !specialCharacter.test(this.userForDB.password) ? this.errorMsg.push('Password must contain at least one special character ') : null;
        }

        if (this.errorMsg && this.errorMsg.length > 0) {
            return;
        } else {
            this.userId ? this.updateUser() : this.createUser();
        }
    }

    createUser() {
        this.isLoading = true;
        this.mistralUserService.create(this.userForDB)
            .subscribe((res) => {
                this.onSuccess();
            }, (err) => this.logger.onError(err));
    }

    updateUser() {
        this.isLoading = true;
        this.mistralUserService.update(this.userForDB)
            .subscribe((res) => {
                this.onSuccess();
            }, (err) => this.logger.onError(err));
    }

    onSuccess() {
        this.isLoading = false;
        window.history.back();
    }

    onStatusChange(statusId) {
        this.userForDB.statusId = statusId;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
