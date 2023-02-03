import 'antd/dist/reset.css';
import {  Col,  Row, Tabs } from 'antd';
import { LogHistory, SubmissionForm } from './components/forms';
import Users from './components/forms/Users';
import { FormOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { prisma } from '@/lib/services/db';
import { MessageNotification, MessageTypes } from './components/message';

export default function Home({ users, ...props}: any) {

  const gridCols = { md:{span: 15},sm:{span: 7}, xs:{span: 22}, lg: {span:10} }

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
      children: <Users users={users} />
    }
  ]

  return (
    <> 
     <MessageNotification />
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
      users: users.map(user => ({ ...user, subscriptions: user.subscriptions.map(sub => sub.category.name),registeredChannels: user.registeredChannels.map(v => v.channel.name) }))
    }
  }
}