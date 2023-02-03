import { message } from "antd";
import { useEffect } from "react";
import { messageState } from '@/features/message-slice';
import { useAppSelector } from "@/hooks";


export enum MessageTypes {
    SUCCESS,ERROR
}

export function MessageNotification(props: any){
    const [messageApi, contextHolder] = message.useMessage();
        
    const { message: alert } = useAppSelector(messageState);
    

    useEffect(() => {
        if(alert){
            if(alert.type === MessageTypes.SUCCESS){
                messageApi.success(alert.data)
            }else if(alert.type === MessageTypes.ERROR){
                messageApi.error(alert.data)
            }
        }
    },[alert, messageApi])


    return contextHolder;
}