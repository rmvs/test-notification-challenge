import React from "react";

import { Layout as AntdLayout, Menu, } from 'antd';
import Meta from "./Meta";
const { Header, Content } = AntdLayout;


export default function Layout({ children, items }:{ children: React.ReactNode, items: any[] }) {
    
    const metaProps = { title: 'Notification Test', description: 'Gila Software Coding Challenge' }
    return (
        <>
            <Meta {...metaProps} />
            <AntdLayout>
                <Header>
                    <Menu theme="dark" mode="horizontal" items={[]} />
                </Header>
                <Content style={{padding: '0 50px', minHeight: 'calc(100vh - 64px)', display: 'flex'}}>
                    <Content
                        style={{minHeight: 280, padding: '24px', margin: '24px 0'}}>
                        { children }
                    </Content>
                </Content>
            </AntdLayout>
        </>
    )
}