import { store } from "@/store";
import { EmailStrategy, NotificationStrategy, PushNotificationStrategy, SMSStrategy } from "../business";
import { Category, EmailNotification, PushNotification, SMSNotification, User } from "../models";
import { Message } from "../models/message";

export default class ChannelService{

    constructor(){
        
    }
    notify(message: Message){
        store.getState().userData.users!!.filter(subscriber =>  subscriber.subscribed.map(v => v.type).includes(message.type))
                                    .flatMap(user => user.channels)
                                    .forEach(notification => notification.notify(message));

    }
}