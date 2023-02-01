import { User } from "../models";
import { Message } from "../models/message";

export interface NotificationStrategy {
    notify(message: Message, id: String): void;
}

export class SMSStrategy implements NotificationStrategy{
    notify(message: Message, id: String): void {
        throw new Error("Method not implemented.");
    }
    
    
}

export class EmailStrategy implements NotificationStrategy {
    notify(message: Message, id: String): void {
        throw new Error("Method not implemented.");
    }

}

export class PushNotificationStrategy implements NotificationStrategy {
    notify(message: Message, id: String): void {
        throw new Error("Method not implemented.");
    }
}
