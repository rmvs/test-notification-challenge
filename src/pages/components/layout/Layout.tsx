import React from "react";

import { Breadcrumb, Layout as AntdLayout, Menu, theme } from 'antd';
import Meta from "./Meta";
const { Header, Content, Sider } = AntdLayout;


export default function Layout({ children, items, ...props }:{ children: React.ReactNode, items: any[] }) {

    const { token: { colorBgContainer } } = theme.useToken();
    
    const metaProps = { title: 'Notification Test', description: 'Gila Software Coding Challenge' }
    // backgroundColor: colorBgContainer
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