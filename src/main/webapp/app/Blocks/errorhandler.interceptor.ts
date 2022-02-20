
import {HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {JhiEventManager} from 'ng-jhipster';

export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private eventManager: JhiEventManager) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (!(err.status === 401 && (err.message === '' || (err.url && err.url.indexOf('/api/account') === 0))) && !(err.status === 404)) {
                    if (this.eventManager !== undefined) {
                        console.log('broadcasting error');
                        this.eventManager.broadcast({name: 'jhipsterApp.httpError', content: err});
                    }
                }
            }
        });
    }
}
