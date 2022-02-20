import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../../shared/modal.service';
import {GenericModalComponent} from '../../../shared/generic-modal/generic-modal.component';
import {Subject} from 'rxjs/Subject';
import {LoggerService} from '../../../shared/logger-service';
import {MistralUserService} from '../mistral-user.service';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-delete-user-popup',
    templateUrl: './delete-user-popup.component.html',
    styles: []
})
export class DeleteUserPopupComponent implements OnInit {
    @ViewChild('modal') modal: GenericModalComponent;
    unsubscribe: Subject<void> = new Subject<void>();

    private id;

    constructor(
        private logger: LoggerService,
        private mistralUserService: MistralUserService,
        private eventManager: JhiEventManager,
    ) {
    }

    ngOnInit() {
    }

    onDelete() {
        this.mistralUserService.delete(this.id)
            .subscribe((res) => {
                this.eventManager.broadcast({name: 'userDeletedEvent', content: 'OK'});
            }, (err) => this.logger.onError(err), () => {this.modal.onClose(); });
    }
}

@Component({
    template: ''
})
export class DeleteUserPopupDialogComponent {
    constructor(
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute
    ) {
        const id = this.activatedRoute.snapshot.params['id'];

        modalService.open(DeleteUserPopupComponent as Component,
            {size: 'lg'},
            [{name: 'id', value: id}]);
    }
}
