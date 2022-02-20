import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MistralUserModel} from './mistral-user.model';
import {ResponseWrapper} from '../../shared/response-wrapper';

@Injectable()
export class MistralUserService {

    private resourceUrl = '/api/mistral-users';

    constructor(private http: HttpClient) {}

    create(mistralUserModel: MistralUserModel): Observable<MistralUserModel> {
        const copy = this.convert(mistralUserModel);
        return this.http.post<MistralUserModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    update(mistralUserModel: MistralUserModel): Observable<MistralUserModel> {
        const copy = this.convert(mistralUserModel);
        return this.http.put<MistralUserModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    find(id: number): Observable<MistralUserModel> {
        return this.http.get<MistralUserModel>(`${this.resourceUrl}/${id}`)
            .map((item) => this.convertItemFromServer(item));
    }

    query(options?: any): Observable<ResponseWrapper> {
        return this.http.get<MistralUserModel[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<MistralUserModel[]>) => this.convertResponse(res));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<MistralUserModel[]>): ResponseWrapper {
        const jsonResponse: MistralUserModel[] = res.body;
        const body: MistralUserModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, body, res.status);
    }

    /**
     * Convert a returned JSON object to AbEmployeeControl.
     */
    private convertItemFromServer(json: any): MistralUserModel {
        const entity: MistralUserModel = Object.assign(new MistralUserModel(), json);
        return entity;
    }

    /**
     * Convert a AbEmployeeControl to a JSON which can be sent to the server.
     */
    private convert(mistralUserModel: MistralUserModel): MistralUserModel {
        const copy: MistralUserModel = Object.assign({}, mistralUserModel);
        return copy;
    }
}
