import { User } from "../models";
import { Message } from "../models/message";
import { store } from "@/store";
import { notify } from "@/features/channel-slice";
import { NotificationType } from "../models/notification";

export interface NotificationStrategy {
    channelType: NotificationType;
    notify(message: Message): void;
}

export class SMSStrategy implements NotificationStrategy{
    channelType: NotificationType = NotificationType.SMS;
    notify(message: Message): void {
        store.dispatch(notify({ message, channelType: this.channelType}));  
    }  
}

export class EmailStrategy implements NotificationStrategy {
    channelType: NotificationType = NotificationType.EMAIL;
    notify(message: Message): void {
        store.dispatch(notify({ message, channelType: this.channelType })); 
    }

}

export class PushNotificationStrategy implements NotificationStrategy {
    channelType: NotificationType = NotificationType.PUSH;
    notify(message: Message): void {
        store.dispatch(notify({ message, channelType: this.channelType })); 
    }
}
