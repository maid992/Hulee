import { Table, Button, Checkbox, Layout, Menu, Breadcrumb, Icon } from 'antd'
import * as React from 'react'
import { observer } from 'mobx-react'
import { AppState } from './AppState'
import { consume, AppContext } from './consume';
import { Sidebar } from './Sidebar';
import { Trail } from './Trail';

const { SubMenu } = Menu
const {Header, Footer, Sider, Content} = Layout

@consume(AppContext.Consumer)
@observer
export class ProjectTable extends React.Component<{state?: AppState}> {
  render () {
    return (
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sidebar />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          Content
          <Trail />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
    )
  }
}
