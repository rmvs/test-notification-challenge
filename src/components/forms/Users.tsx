import { CATEGORY_COLORS } from "@/lib/constants";
import { Category, Notification, User } from "@/lib/models";
import { Table, Tag } from "antd";

export default function Users({ users, ...props }: any){
    const columns = [
        {
            title: 'User',
            dataIndex: '_name',
            key: '_name',
            width: 100
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
            render: (_categories: Category[],_: any) => _._subscribed.map((category: Category) => <Tag key={category.type} color={CATEGORY_COLORS[category.type]}>{category.type}</Tag>)
        },
        {
            title: 'Channels',
            dataIndex: '_notification',
            key: '_notification',
            render: (_notification: Notification[]) => _notification.map((channel: Notification) => <Tag key={String(channel.toString())}>{channel.toString()}</Tag>),
        }
    ]

    return <Table scroll={{ x: 5, y: 150 }} pagination={{ pageSize: 3 }} dataSource={users.map((user: any) => ({...user, key: user.id}))} columns={columns} />
}