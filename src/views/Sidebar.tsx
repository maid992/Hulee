import * as React from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'

const { SubMenu } = Menu
const { Sider } = Layout

@consumeStore
@observer
export class Sidebar extends React.Component<AppContextProps> {
  handleClick = (e: any) => {
    const value = e.item.props.children
    this.props.locationState.changePage(value)
  }

  render () {
    return (
      <div
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          width: '180px',
          backgroundColor: '#333'
        }}
      >
        <a href="https://www.youtube.com/watch?v=Hjwn4QJ0v5U" target="_blank">
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'start',
              height: '40px',
              margin: '30px 0 40px 20px'
            }}
          >
            <div style={{ display: 'inline-block', width: '30px' }}>
              <img
                style={{
                  color: '#d6204b',
                  width: '80%',
                  padding: '0px 0px 0 0px',
                  margin: '0 5px 7px 0px'
                }}
                className="ant-menu-item icon"
                src="src/img/favicon.png"
              />
            </div>
            <span
              style={{
                fontFamily: 'Baloo',
                fontSize: '190%',
                color: '#fff',
                margin: '0px 0px 0px 5px',
                padding: '0px 0px 0px 0',
                height: '38px',
                width: '100px',
                display: 'inline-block',
                letterSpacing: 0.5
              }}
            >
              Hulee
            </span>
          </div>
        </a>
        <Row
          type="flex"
          style={{
            flexDirection: 'column',
            alignItems: 'start',
            marginTop: '20px',
            color: '#b5b5b5',
            fontWeight: 600,
            width: '180px'
          }}
        >
          <Col className="popover-sidebar">
            <Icon
              className="icon"
              style={{ color: 'grey', width: '55px' }}
              type="tag"
              title="Start Time"
            />
            Projects
          </Col>
          <Col className="popover-sidebar">
            <Icon
              style={{ color: 'grey', width: '55px' }}
              className="icon"
              type="heart"
              title="Start Time"
            />
            Time Tracking
          </Col>
          <Col className="popover-sidebar">
            <Icon
              style={{ color: 'grey', width: '55px' }}
              className="icon"
              type="file"
              title="Start Time"
            />
            Reports
          </Col>
          <Col className="popover-sidebar">
            <Icon
              style={{ color: 'grey', width: '55px' }}
              className="icon"
              type="instagram"
              title="Start Time"
            />
            Dashboard
          </Col>
          <Col className="popover-sidebar">
            <Icon
              style={{ color: 'grey', width: '55px' }}
              className="icon"
              type="youtube"
              title="Start Time"
            />
            Help
          </Col>
        </Row>
      </div>
      // <Sider
      //   theme="dark"
      //   style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
      //   width={180}
      // >
      //   <Menu
      //     theme="dark"
      //     onClick={this.handleClick}
      //     mode="inline"
      //     defaultSelectedKeys={[ '1' ]}
      //     defaultOpenKeys={[ 'sub1' ]}
      //   >
      //     <SubMenu
      //       key="sub1"
      //       title={
      //         <span>
      //           <Icon type="laptop" />
      //         </span>
      //       }
      //     >
      //       <Menu.Item key="5">Projects</Menu.Item>
      //       <Menu.Item key="6">Time Tracking</Menu.Item>
      //       <Menu.Item key="7">To-do</Menu.Item>
      //       <Menu.Item key="8">Reports</Menu.Item>
      //     </SubMenu>
      //     <SubMenu
      //       key="sub2"
      //       title={
      //         <span>
      //           <Icon type="user" />
      //         </span>
      //       }
      //     >
      //       <Menu.Item key="1">Edit Profile</Menu.Item>
      //       <Menu.Item key="3">Log Out</Menu.Item>
      //     </SubMenu>
      //     <SubMenu
      //       key="sub3"
      //       title={
      //         <span>
      //           <Icon type="notification" />
      //         </span>
      //       }
      //     >
      //       <Menu.Item key="9">Feedback</Menu.Item>
      //       <Menu.Item key="11">Desktop App</Menu.Item>
      //       <Menu.Item key="10">About</Menu.Item>
      //     </SubMenu>
      //   </Menu>
      // </Sider>
    )
  }
}
