import * as React from 'react'
// import { Layout, Menu, Icon } from 'antd'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import { TimeEntryModel } from './TimeTrackingStore'
import { Row, Col, Button } from 'antd'

@consumeStore
@observer
export class TimeEntriesListItem extends React.Component<
  AppContextProps & { listItem: TimeEntryModel }
> {
  render () {
    return (
      <React.Fragment>
        <Row>
          <Col span={20}>{this.props.listItem.description}</Col>
          {'  '}
          <Col span={2}>{this.props.listItem.duration}</Col>
          <Col span={1}><Button>X</Button></Col>
        </Row>
      </React.Fragment>
    )
  }
}
