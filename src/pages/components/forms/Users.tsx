import { useAppSelector } from "@/hooks";
import { CATEGORY_COLORS } from "@/lib/constants";
import { CategoryType, SMSNotification, User } from "@/lib/models";
import { Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";

export default function Users({ users, ...props }: any){
    
    const dataSource = users.map( ({ id, name, subscriptions, registeredChannels }: any) => 
                ({ key: id, name, categories: subscriptions , channels: registeredChannels }));                


    
    const columns = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            width: 100
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
            render: (categories: any[]) => {
                return (
                    categories.map((category: string) => <Tag key={category} color={CATEGORY_COLORS[category as CategoryType]}>{category}</Tag>)
                )
            }
        },
        {
            title: 'Channels',
            dataIndex: 'channels',
            key: 'channels',
            render: (channels: any[]) => channels.map(channel => <Tag key={channel}>{channel}</Tag>),
        }
    ]

    return (
        <>
            <Table
                // style={{height: 210}} 
                scroll={{ x: 5, y: 150 }} pagination={{ pageSize: 3 }} dataSource={dataSource} columns={columns} />
        </>
    )
}