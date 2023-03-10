import { Category } from "./category";
import { Notification } from "./notification";

export class User {  
    
    constructor(
        private _id: string,
        private _name: string,
        private _phoneNumber: string, 
        private _subscribed: Category[] = [],
        private _notification: Notification[] = []
    ){

    }

    get name(): string{
        return this._name;
    }

    get phoneNumber(): string{
        return this._phoneNumber;
    }

    get id(): string {
        return this._id;
    }

    set subscribed(_category: Category[]){
        this._subscribed = _category
    }

    get subscribed(): Category[]{
        return this._subscribed;        
    }

    get notification(): Notification[] {
        return this._notification
    }

    set notification(_notification: Notification[]){
        this._notification = _notification
    }

}