import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
    constructor(){}

    onError(error) {
        if (error && error.status) {
            console.error('error.http.' + error.status);
        } else {
            console.error('error.' + error);
        }
    }

}
