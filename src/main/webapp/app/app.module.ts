import './vendor.ts';

import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage  } from 'ngx-webstorage';
import { MistralSharedModule, UserRouteAccessService } from './shared';
import { MistralAppRoutingModule} from './app-routing.module';
import { MistralHomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent,
} from './layouts';
import { MistralUserModifyComponent } from './Entity/mistral-user/mistral-user-modify/mistral-user-modify.component';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandlerInterceptor} from './Blocks/errorhandler.interceptor';
import {NotificationInterceptor} from './Blocks/notification.interceptor';
import {JhiEventManager} from 'ng-jhipster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Injector, NgModule} from '@angular/core';

@NgModule({
    imports: [
        BrowserModule,
        MistralAppRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        MistralSharedModule,
        MistralHomeModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
        HttpClientModule,
        BrowserAnimationsModule

        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        MistralUserModifyComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        ProfileService,
        UserRouteAccessService,
    ],
    bootstrap: [JhiMainComponent]
})
export class MistralAppModule {}
