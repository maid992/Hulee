import { Button, Col, Icon, Popover, Row, Input } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'
import * as moment from 'moment'
import { AppContextProps, consumeStore } from '../state/consume'
import { TimeEntryModel } from '../state/TimeEntryModel'

// import * as Calendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import { ProjectItem } from './ProjectItem/ProjectItem'

type RenderCallback = (args: TimeEntryModel) => JSX.Element

@consumeStore
@observer
export class TimeEntriesListItem extends React.Component<
  AppContextProps & { listItem?: TimeEntryModel; children?: RenderCallback }
> {
  hovering: boolean = false

  handleVisibleChange = (visible: boolean) => {
    this.props.timeTrackingStore.handlePopdownVisibility(
      visible,
      this.props.listItem.getId
    )
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTimeEntry = this.props.listItem
    currentTimeEntry.description = e.target.value

    this.props.timeTrackingStore.timeEntryAdd(currentTimeEntry)
  }

  onProjectSelect = (id: number) => {
    const currentTimeEntry = this.props.listItem
    currentTimeEntry.projectId = id

    this.props.timeTrackingStore.timeEntryAdd(currentTimeEntry)
    this.props.timeTrackingStore.handlePopdownVisibility(false, this.props.listItem.getId)
  }

  render () {
    const { projectId, description, getId } = this.props.listItem
    const { popdowns, timeEntryGet } = this.props.timeTrackingStore

    const project = this.props.timeTrackingStore.getProjectById(projectId)
    const projectIconData = project ? project.name : 'No Project'

    const popdownVisible = popdowns.get(getId)
    const popdownContent = this.props.children(this.props.listItem)

    const { start, stop } = timeEntryGet(getId)
    const startTime = moment(start).format('hh:mm A')
    const stopTime = moment(stop).format('hh:mm A')

    return (
      <React.Fragment>
        <Row align="middle" type="flex" className="listItem">
          <Col
            className="fontFix"
            style={{
              paddingLeft: '10px',
              display: 'inline-block',
              minWidth: '200px',
              width: description ? description.length * 7.5 + 50 : '200px',
              maxWidth: '42%'
            }}
          >
            <Input
              autoComplete="off"
              spellCheck={false}
              className="editable"
              value={this.props.listItem.description}
              placeholder="Add description"
              onChange={this.onChange}
              style={{ backgroundColor: 'transparent' }}
            />
          </Col>
          {project ? (
            <Col
              style={{
                padding: '0 10px',
                flex: '0 0 auto',
                width: 'auto',
                color: '#6e5cd1'
              }}
              span={4}
            >
              <Popover
                placement="bottom"
                title="Projects"
                trigger="click"
                content={popdownContent}
                visible={popdownVisible}
                onVisibleChange={this.handleVisibleChange}
              >
                <div className="teProject">
                  <span>
                    <img
                      style={{
                        height: '30px',
                        width: '30px',
                        marginBottom: '3px',
                        // display: 'inline-block'
                      }}
                      src="src/img/bullet.svg"
                    />
                  </span>
                  {project.name}
                </div>
              </Popover>
            </Col>
          ) : (
            <Col
              style={{
                padding: '0 10px',
                flex: '0 0 auto',
                width: 'auto'
              }}
              span={4}
              className="iconCol"
            >
              <Popover
                placement="bottom"
                title="Projects"
                trigger="click"
                content={popdownContent}
                visible={popdownVisible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Icon className="icon" type="folder" title={projectIconData} />
              </Popover>
            </Col>
          )}

          <Col
            style={{
              flex: '0 0 auto',
              width: '200px',
              marginLeft: 'auto',
              color: 'grey'
            }}
          >
            <span>{startTime}</span>
            {' - '}
            <span>{stopTime}</span>
          </Col>
          <Col style={{ flex: '0 0 auto', width: '100px' }}>
            {this.props.listItem.duration}
          </Col>
          <Col className="iconCol" style={{ flex: '0 0 auto', width: '50px' }}>
            <Icon
              className="icon"
              type="close"
              title="Remove Time Entry"
              onClick={() =>
                this.props.timeTrackingStore.timeEntryDelete(this.props.listItem.getId)}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
