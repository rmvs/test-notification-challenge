import { EmailStrategy, NotificationStrategy, PushNotificationStrategy, SMSStrategy } from "../business";
import { Category, EmailNotification, PushNotification, SMSNotification, User } from "../models";
import { Message } from "../models/message";

export default class ChannelService{

    constructor(private subscribers: User[] = []){
        
    }

    notify(message: Message){
        this.subscribers.filter(subscriber =>  subscriber.subscribed.filter(s => s.getID() === message.category.getID()))
                        .map(({ id, channels }) => channels.forEach(s => s.notify(message,id)))
    }

    subscribeUser(user: User){
        this.subscribers.push(user);
    }

    unsubscribeUser(user: User){
        this.subscribers = [...this.subscribers.filter(s => s.id === user.id)]
    }
}