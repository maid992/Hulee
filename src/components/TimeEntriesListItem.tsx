import { Button, Col, Icon, Popover, Row, Input, DatePicker } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { TimeEntryModel } from '../state/TimeEntryModel'
import * as moment from 'moment'

@consumeStore
@observer
export class TimeEntriesListItem extends React.Component<
  AppContextProps & { listItem: TimeEntryModel }
> {
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTimeEntry = this.props.listItem
    currentTimeEntry.description = e.target.value

    this.props.timeTrackingState.timeEntryAdd(currentTimeEntry)
  }

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
          style={{ minHeight: '55px', boxShadow: 'inset 0 -1px 0 0 #e8e8e8' }}
          className="listItem"
        >
          <Col
            className="fontFix"
            style={{
              paddingLeft: '30px',
              display: 'inline-block',
              minWidth: '100px',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            <Input
              autoComplete="off"
              spellCheck={false}
              className="editable"
              value={this.props.listItem.description}
              placeholder="Add description"
              onChange={this.onChange}
              style={{backgroundColor: 'transparent'}}
            />
          </Col>
          <Col
            style={{
              padding: '0 30px',
              minWidth: '100px',
              maxWidth: '150px'
            }}
            span={4}
          >
            <Popover
              placement="bottom"
              title="Projects"
              trigger="click"
              content={popoverContent}
            >
              <div className="teProject">{project ? project.name : `Projectless`}</div>
            </Popover>
          </Col>
          <Col span={4} style={{ marginLeft: 'auto' }}>
            <Popover
              placement="bottom"
              title="Projects"
              trigger="click"
              content={popoverContent}
            >
              <Icon className="icon" type="folder" title={projectIconData} />
            </Popover>
          </Col>

          <Col span={2}>
            {this.props.listItem.duration}
          </Col>
          <Col span={3}>
            <DatePicker className="datePicker" showTime defaultValue={moment(this.props.listItem.date)} />
          </Col>
          <Col span={2}>
            <Button
              type="danger"
              style={{ border: 'none', marginLeft: '10px' }}
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
