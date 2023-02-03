import 'antd/dist/reset.css';
import {  Col,  Row, Tabs } from 'antd';
import { LogHistory, SubmissionForm } from '@/components/forms';
import Users from '@/components/forms/Users';
import { FormOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { prisma } from '@/lib/db';
import { MessageNotification, MessageTypes } from '@/components/message';
import { useEffect } from 'react';
import { Category, CategoryType, Notification, NotificationType, User } from '@/lib/models';
import { Notify } from '@/components/notify';

export default function Home({ users, ...props}: { users: any[], props: any }) {

  const gridCols = { md:{span: 15},sm:{span: 7}, xs:{span: 22}, lg: {span:10} }

  const _users = users.map(({ id, name, phoneNumber, subscribed, channels }: any) => new User(id,name,phoneNumber,subscribed.map((sub: string) => new Category(sub as CategoryType)),channels.map((channel: string) => new Notification(channel as NotificationType)!!)))

  const tabItems = [
    {
      key: 'log-history',
      label: <span><HistoryOutlined />Log History</span>,
      children: <LogHistory />
    },
    {
      key: 'submission-form',
      label: <span><FormOutlined />Submission Form</span>,
      children: <SubmissionForm />
    },
    {
      key: 'users-list',
      label: <span><UserOutlined />Users</span>,
      children: <Users users={_users} />
    }
  ]

  return (
    <> 
     <MessageNotification />
      <Notify users={_users} />
      <Row justify={"center"}>
        <Col {...gridCols}>
          <Tabs items={tabItems} /> 
        </Col>
      </Row>
    </>
  )
}

export async function getServerSideProps(context: any){
  const users = await prisma.user.findMany(
    {
      take: 3,
      select: {
        email: true,
        id: true,
        name: true,
        phoneNumber: true,
        registeredChannels: {
          select: {
            idChannel: false,
            channel: true,
          }
        },
        subscriptions: {
          select: {
            idCategory: false,
            category: true,
          }
        }
      },
    }
  );
  return {
    props: {
      users: users.map(({ registeredChannels,subscriptions,...rest }) => ({ ...rest, subscribed: subscriptions.map(sub => sub.category.name),channels: registeredChannels.map(v => v.channel.name) }))
    }
  }
}