import { channelState } from "@/features/channel-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { CategoryType, Notification, User } from "@/lib/models";
import { useEffect } from "react";
import { clear } from '@/features/channel-slice';

export function Notify({ users, ...props }: { users: User[] }){

    const { messages } = useAppSelector(channelState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const keys: CategoryType[] = []
        for(const key of Object.keys(messages)){
            if(messages[key as CategoryType]?.length!! > 0){
                keys.push(key as CategoryType);
                messages[key as CategoryType]?.forEach(message => {
                    users.filter(user => user.subscribed.map(category => category.type).includes(message.type)).forEach(user => {
                        user.notification.forEach(notification => notification.notify(message, user))
                    })
                })
            }
        }
        return () => keys.forEach(key => dispatch(clear(key as CategoryType)))

    },[dispatch, messages, users])


    return null;
}