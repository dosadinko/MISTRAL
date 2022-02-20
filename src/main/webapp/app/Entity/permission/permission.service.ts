import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ResponseWrapper} from '../../shared/response-wrapper';
import {PermissionModel} from './permission.model';

@Injectable()
export class PermissionService {

    private resourceUrl = '/api/permissions';

    constructor(private http: HttpClient) {}

    create(permissionModel: PermissionModel): Observable<PermissionModel> {
        const copy = this.convert(permissionModel);
        return this.http.post<PermissionModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    update(permissionModel: PermissionModel): Observable<PermissionModel> {
        const copy = this.convert(permissionModel);
        return this.http.put<PermissionModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    find(id: number): Observable<PermissionModel> {
        return this.http.get<PermissionModel>(`${this.resourceUrl}/${id}`)
            .map((item) => this.convertItemFromServer(item));
    }

    query(options?: any): Observable<ResponseWrapper> {
        return this.http.get<PermissionModel[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<PermissionModel[]>) => this.convertResponse(res));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<PermissionModel[]>): ResponseWrapper {
        const jsonResponse: PermissionModel[] = res.body;
        const body: PermissionModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, body, res.status);
    }

    /**
     * Convert a returned JSON object to AbEmployeeControl.
     */
    private convertItemFromServer(json: any): PermissionModel {
        const entity: PermissionModel = Object.assign(new PermissionModel(), json);
        return entity;
    }

    /**
     * Convert a AbEmployeeControl to a JSON which can be sent to the server.
     */
    private convert(permissionModel: PermissionModel): PermissionModel {
        const copy: PermissionModel = Object.assign({}, permissionModel);
        return copy;
    }
}
