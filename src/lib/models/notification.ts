import { EmailStrategy, NotificationStrategy, PushNotificationStrategy, SMSStrategy } from "../business"
import { Message } from "./message";
import { User } from "./user";

export enum NotificationType {
    SMS="SMS",EMAIL="EMAIL",PUSH="PUSH"
}

const NotificationStrategies = {
    [NotificationType.SMS]: new SMSStrategy(),
    [NotificationType.PUSH]: new PushNotificationStrategy(),
    [NotificationType.EMAIL]: new EmailStrategy()
}

export class Notification {

    private _strategy: NotificationStrategy | null = null;

    constructor(private _notificationType: NotificationType){
        this._strategy = NotificationStrategies[_notificationType];
    }

    get strategy(): NotificationStrategy {
        return this._strategy!!;
    }

    set strategy(strategy: NotificationStrategy){
        this._strategy = strategy;
    }

    notify(message: Message, user: User){
        this._strategy!!.notify(message, user)
    }

    public toString(): String{
        return this._strategy?.toString()!!;
    }
}
