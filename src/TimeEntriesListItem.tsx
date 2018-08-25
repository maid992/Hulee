import * as React from 'react'
// import { Layout, Menu, Icon } from 'antd'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import { TimeEntryModel } from './TimeTrackingStore'
import { Row, Col, Button, Icon, Popover, Form, Input } from 'antd'

@consumeStore
@observer
export class TimeEntriesListItem extends React.Component<
  AppContextProps & { listItem: TimeEntryModel }
> {
  render () {
    const pid = this.props.listItem.projectId
    const project = this.props.timeTrackingState.getProjectById(pid)
    const projects = this.props.timeTrackingState.getAllProjects
    const projectIconData = project ? project.name : 'No Project'

    const popoverContent = (
      <React.Fragment>
        {projects.map((pr) => <p key={pr.id}>{pr.name}</p>)}
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Row
          align="middle"
          type="flex"
          style={{ minHeight: '45px', boxShadow: 'inset 0 -1px 0 0 #e8e8e8' }}
        >
          <Col
            className="fontFix"
            style={{
              padding: '0 30px'
            }}
            span={16}
          >
            {this.props.listItem.description}
          </Col>
          <Col span={4}>
            <Popover
              placement="bottom"
              title="Projects"
              trigger="click"
              content={popoverContent}
            >
              <Icon className="icon" type="folder" title={projectIconData} />
            </Popover>
          </Col>
          <Col span={2}>{this.props.listItem.duration}</Col>
          <Col span={2}>
            <Button
              type="danger"
              style={{ border: 'none' }}
              onClick={() =>
                this.props.timeTrackingState.timeEntryDelete(this.props.listItem.getId)}
            >
              <Icon className="icon" type="close" title="Remove Time Entry" />
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
