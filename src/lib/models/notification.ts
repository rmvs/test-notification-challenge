import { EmailStrategy, NotificationStrategy, PushNotificationStrategy, SMSStrategy } from "../business"
import { Message } from "./message";

export enum NotificationType {
    SMS="SMS",EMAIL="EMAIL",PUSH="PUSH"
}

export class Notification {
    constructor(private _strategy: NotificationStrategy){

    }

    notify(message: Message){
        this._strategy.notify(message)
    }

    get type(): NotificationType {
        return this._strategy.channelType;
    }
    
}

export class SMSNotification extends Notification {
    constructor(){
        super(new SMSStrategy())
    }
}

export class EmailNotification extends Notification {
    constructor(){
        super(new EmailStrategy())
    }
}

export class PushNotification extends Notification {
    constructor(){
        super(new PushNotificationStrategy())
    }
}