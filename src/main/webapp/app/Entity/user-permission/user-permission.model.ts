export class UserPermissionModel {
    constructor(
        public id?: number,
        public mistralUserId?: number,
        public mistralUserName?: string,
        public mistralUserLastname?: string,
        public permissionId?: number,
        public permissionName?: string,
        public permissionDescription?: string
    ) {
    }
}
