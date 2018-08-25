import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { consume, AppContext, AppContextProps } from './consume'

const { SubMenu } = Menu
const { Sider } = Layout

// {
//   currentPage?: string,
//   changePage?: (page: string) => void
// }

@consume(AppContext.Consumer)
export class Sidebar extends React.Component<AppContextProps> {
  handleClick = (e) => {
    const value = e.item.props.children
    this.props.locationState.changePage(value)
  }

  render () {
    return (
      <Sider theme='dark' width={180}>
        <Menu
          onClick={this.handleClick}
          mode="inline"
          defaultSelectedKeys={[ '1' ]}
          defaultOpenKeys={[ 'sub1' ]}
          style={{ height: '100%', background: '#722199', color: '#fff', borderRight: '5px' }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="laptop" />
              </span>
            }
          >
            <Menu.Item key="5">Projects</Menu.Item>
            <Menu.Item key="6">Time Tracking</Menu.Item>
            <Menu.Item key="7">To-do</Menu.Item>
            <Menu.Item key="8">Reports</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
              </span>
            }
          >
            <Menu.Item key="1">Edit Profile</Menu.Item>
            <Menu.Item key="3">Log Out</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
              </span>
            }
          >
            <Menu.Item key="9">Feedback</Menu.Item>
            <Menu.Item key="11">Desktop App</Menu.Item>
            <Menu.Item key="10">About</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
