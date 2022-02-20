export class MistralUserModel {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public password?: string,
        public email?: string,
        public statusId?: string,
    ) {
    }
}
