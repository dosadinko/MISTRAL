import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    MistralSharedLibsModule,
    MistralSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
} from './';
import {LoggerService} from './logger-service';
import {BackButtonComponent} from './back-button/back-button.component';

@NgModule({
    imports: [
        MistralSharedLibsModule,
        MistralSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        BackButtonComponent
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        LoggerService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        MistralSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        BackButtonComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MistralSharedModule {}
