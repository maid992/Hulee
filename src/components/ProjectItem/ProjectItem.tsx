import * as React from 'react'
import { AppContextProps, consumeStore } from '../../state/consume'
import { observer } from 'mobx-react'

import { Row, Col } from 'antd'
import { ProjectModel } from '../../state/ProjectModel'

@consumeStore
@observer
export class ProjectItem extends React.Component<
  AppContextProps & { project?: ProjectModel }
> {
  render () {
    const { name, color, id } = this.props.project
    return (
      <React.Fragment>
        <Row style={{alignContent: 'center'}} className="popover-projects" >
          <Col span={4} style={{ color, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '80%', marginRight: '6px', whiteSpace: 'nowrap' }}>
              ☪
            </span>
          </Col>
          <Col span={20} style={{ color }}>{name}</Col>
        </Row>
      </React.Fragment>
    )
  }
}
