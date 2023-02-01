import { EmailStrategy, NotificationStrategy, PushNotificationStrategy, SMSStrategy } from "../business"
import { Message } from "./message";

export class Notification {
    constructor(public name: string, private strategy: NotificationStrategy){}

    public notify(message: Message, id: string){
        this.strategy.notify(message,id);
    }
}

export class SMSNotification extends Notification {
    constructor(){
        super("SMS", new SMSStrategy())
    }
}

export class EmailNotification extends Notification {
    constructor(){
        super("EMAIL", new EmailStrategy())
    }
}

export class PushNotification extends Notification {
    constructor(){
        super("PUSH", new PushNotificationStrategy())
    }
}