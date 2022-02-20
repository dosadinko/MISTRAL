import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LoggerService} from '../../shared/logger-service';
import {StatusService} from './status.service';
import {Subject} from 'rxjs/Subject';
import {StatusModel} from './status.model';
import {ResponseWrapper} from '../../shared/response-wrapper';

@Component({
    selector: 'jhi-status',
    templateUrl: './status.component.html',
    styles: []
})
export class StatusComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    statusList: StatusModel[] = [];
    @Output() statusName = new EventEmitter<number>();

    constructor(
        private logger: LoggerService,
        private statusService: StatusService
    ) {
    }

    ngOnInit() {
        this.loadStatuses();
    }

    loadStatuses() {
        this.statusService.query()
            .takeUntil(this.unsubscribe)
            .subscribe((res: ResponseWrapper) => {
                this.statusList = res.json;
            }, (err) => this.logger.onError(err));
    }

    statusChanged(statusId) {
        this.statusName.emit(statusId);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
