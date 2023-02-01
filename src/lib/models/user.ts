import { Category } from "./category";
import { Notification } from "./notification";

export class User {
    constructor(
        public id: string,
        public name: string,
        public phoneNumber: string,
        public subscribed: Category[],
        public channels: Notification[],     
    ){

    }
}