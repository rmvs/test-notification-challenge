import { NotificationType, User } from "../models";
import { Message } from "../models/message";

export interface NotificationStrategy {
    notify(message: Message, user: User): void;
    toString(): string;
}

export class SMSStrategy implements NotificationStrategy{
    notify(message: Message,user: User): void {
        console.log(`MESSAGE ${message.id} SENT TO USER ${user.name}[${user.id}] VIA SMS`); 
    }  

    toString(): string {
        return NotificationType.SMS;
    }
}

export class EmailStrategy implements NotificationStrategy {
    notify(message: Message, user: User): void {
        console.log(`MESSAGE ${message.id} SENT TO USER ${user.name}[${user.id}] VIA EMAIL`);
    }

    toString(): string {
        return NotificationType.EMAIL;
    }

}

export class PushNotificationStrategy implements NotificationStrategy {
    notify(message: Message, user: User): void {
        console.log(`MESSAGE ${message.id} SENT TO USER ${user.name}[${user.id}] VIA PUSH`);
    }

    toString(): string {
        return NotificationType.PUSH;
    }
}
