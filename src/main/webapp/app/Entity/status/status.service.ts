import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ResponseWrapper} from '../../shared/response-wrapper';
import {StatusModel} from './status.model';

@Injectable()
export class StatusService {

    private resourceUrl = '/api/statuses';

    constructor(private http: HttpClient) {}

    create(statusModel: StatusModel): Observable<StatusModel> {
        const copy = this.convert(statusModel);
        return this.http.post<StatusModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    update(statusModel: StatusModel): Observable<StatusModel> {
        const copy = this.convert(statusModel);
        return this.http.put<StatusModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    find(id: number): Observable<StatusModel> {
        return this.http.get<StatusModel>(`${this.resourceUrl}/${id}`)
            .map((item) => this.convertItemFromServer(item));
    }

    query(options?: any): Observable<ResponseWrapper> {
        return this.http.get<StatusModel[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<StatusModel[]>) => this.convertResponse(res));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<StatusModel[]>): ResponseWrapper {
        const jsonResponse: StatusModel[] = res.body;
        const body: StatusModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, body, res.status);
    }

    /**
     * Convert a returned JSON object to AbEmployeeControl.
     */
    private convertItemFromServer(json: any): StatusModel {
        const entity: StatusModel = Object.assign(new StatusModel(), json);
        return entity;
    }

    /**
     * Convert a AbEmployeeControl to a JSON which can be sent to the server.
     */
    private convert(statusModel: StatusModel): StatusModel {
        const copy: StatusModel = Object.assign({}, statusModel);
        return copy;
    }
}
