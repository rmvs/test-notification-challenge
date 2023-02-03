import { messageState } from "@/features/message-slice";
import { useAppSelector } from "@/hooks";
import { CATEGORY_COLORS } from "@/lib/constants";
import { CategoryType } from "@/lib/models";
import { notificationsAPI } from "@/lib/services/api";
import { Card, Table, Tag } from "antd";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

export default function LogHistory(props: any){  
    
    const [history,setHistory] = useState([]);

    const { message } = useAppSelector(messageState);

    useEffect(() => {
        notificationsAPI.getHistory()
                            .then(async(response: any) => {
                                const { history } = await response.json() || { };
                                setHistory(history);
                            })
    },[message])

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => <Tag key={category} color={CATEGORY_COLORS[category as CategoryType]}>{category}</Tag>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdat',
            render: (createdAt: string) => moment(createdAt).format("YYYY-MM-DD HH:MM:SS")
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message'
        },
        {
            title: 'Sent To',
            dataIndex: 'sentTo',
            key: 'sentTo',
            render: (sentTo: any[]) => {
                return sentTo.map(user => <Tag key={user.id}>{user.email}</Tag>)
            }
        }
    ]
    return (
        <Table columns={columns} dataSource={history} />
    )
}