import { channelState } from "@/features/channel-slice";
import { messageState } from "@/features/message-slice";
import { useAppSelector } from "@/hooks";
import { CATEGORY_COLORS } from "@/lib/constants";
import { CategoryType, User } from "@/lib/models";
import { notificationsAPI } from "@/lib/services/api";
import { Avatar, Button, Card, List, Modal, Space, Table, Tag } from "antd";
import moment from "moment-timezone";
import { useEffect, useState } from "react";


const ListNotifiedUsers = ({ users, open, onOk }: { users: any[], open: boolean, onOk: any}) => {
    return (
        <Modal title="Notified users" open={open} onCancel={onOk}  onOk={onOk} cancelButtonProps={{ style: {'display': 'none'} }}>
            <List itemLayout="horizontal" dataSource={users} size="small"  renderItem={
                (item, index) => (
                    <List.Item extra={<p>{item.channels.map((channel: string) => <Tag key={channel}>{channel}</Tag>)}</p>}> 
                        { item.email }
                    </List.Item>
                )
            } />
        </Modal>
    )
}

export default function LogHistory(props: any){  
    
    const [history,setHistory] = useState([]);
    const [users,setUsers] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    const { message } = useAppSelector(messageState);

    useEffect(() => {
        notificationsAPI.getHistory()
                            .then(async(response: any) => {
                                const { history } = await response.json() || { };
                                setHistory(history);
                            });
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
            key: 'createdAt',
            render: (createdAt: string) => moment(createdAt).format("YYYY-MM-DD HH:MM:ss")
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
                return <Button onClick={() => {
                    setUsers(sentTo);
                    setOpen(true);
                }}>View notified users</Button>
            }
        }
    ]
    return (
        <>
            <ListNotifiedUsers users={users} open={open} onOk={() => setOpen(false)}  />
            <Table columns={columns} scroll={{ x: 5, y: 200 }} pagination={{ pageSize: 5 }} dataSource={history} />
        </>
    )
}