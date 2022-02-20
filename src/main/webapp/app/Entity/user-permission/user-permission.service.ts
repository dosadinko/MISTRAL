import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ResponseWrapper} from '../../shared/response-wrapper';
import {UserPermissionModel} from './user-permission.model';

@Injectable()
export class UserPermissionService {

    private resourceUrl = '/api/user-permissions';

    constructor(private http: HttpClient) {}

    create(userPermissionModel: UserPermissionModel): Observable<UserPermissionModel> {
        const copy = this.convert(userPermissionModel);
        return this.http.post<UserPermissionModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    update(userPermissionModel: UserPermissionModel): Observable<UserPermissionModel> {
        const copy = this.convert(userPermissionModel);
        return this.http.put<UserPermissionModel>(this.resourceUrl, copy)
            .map((item) => this.convertItemFromServer(item));
    }

    find(id: number): Observable<UserPermissionModel> {
        return this.http.get<UserPermissionModel>(`${this.resourceUrl}/${id}`)
            .map((item) => this.convertItemFromServer(item));
    }

    findByUserId(id: number): Observable<ResponseWrapper> {
        return this.http.get<UserPermissionModel[]>(`${this.resourceUrl}/user/${id}`, {observe: 'response'})
            .map((res: HttpResponse<UserPermissionModel[]>) => this.convertResponse(res));
    }

    query(options?: any): Observable<ResponseWrapper> {
        return this.http.get<UserPermissionModel[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<UserPermissionModel[]>) => this.convertResponse(res));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: HttpResponse<UserPermissionModel[]>): ResponseWrapper {
        const jsonResponse: UserPermissionModel[] = res.body;
        const body: UserPermissionModel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, body, res.status);
    }

    /**
     * Convert a returned JSON object to AbEmployeeControl.
     */
    private convertItemFromServer(json: any): UserPermissionModel {
        const entity: UserPermissionModel = Object.assign(new UserPermissionModel(), json);
        return entity;
    }

    /**
     * Convert a AbEmployeeControl to a JSON which can be sent to the server.
     */
    private convert(userPermissionModel: UserPermissionModel): UserPermissionModel {
        const copy: UserPermissionModel = Object.assign({}, userPermissionModel);
        return copy;
    }
}
