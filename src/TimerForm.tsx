import * as React from 'react'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import { Row, Col, Button, Form, Input, Select, Modal, Layout, Popover, Icon } from 'antd'
import { Timer } from './Timer'
import { LabeledValue } from 'antd/lib/select'

import './styles/_timeEntriesListItem.scss'

const Option = Select.Option
const Content = Layout.Content

@consumeStore
@observer
export class TimerForm extends React.Component<AppContextProps> {
  state = {
    project: '',
    hourlyRate: null,
    currency: 'EUR',
    visible: false,
    activity: ''
  }

  onSubmit = (e: React.MouseEvent<any>) => {
    e.preventDefault()
    this.props.timeTrackingState.projectAdd(
      this.state.project,
      this.state.hourlyRate,
      this.state.currency
    )
    this.setState({ project: '', visible: false, hourlyRate: null })
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.target.value }, () => {
      this.props.timerState.changeDescription(this.state.activity)
    })
  }

  onSelectChange = (value: LabeledValue) => {
    this.props.timeTrackingState.setCurrentProject(value.label.toString())
    this.props.timerState.changeProject(parseInt(value.key, 10))
    console.log(value)
  }

  render () {
    const { getAllProjects, getFirstProject } = this.props.timeTrackingState
    const { description } = this.props.timerState

    const defaultValue: LabeledValue = {
      key: getFirstProject.id.toString(),
      label: getFirstProject.name
    }

    const modalForm = (
      <Form onSubmit={this.onSubmit} style={{ maxWidth: '250px' }}>
        <Form.Item {...formItemLayout} label="Project">
          <Input name="project" value={this.state.project} onChange={this.onChange} />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Hourly Rate (Optionally)">
          <Input
            name="hourlyRate"
            value={this.state.hourlyRate}
            onChange={this.onChange}
          />
        </Form.Item>
        <Button key="back">Cancel</Button>,
        <Button key="submit" type="primary" onClick={this.onSubmit}>
          Create New Project
        </Button>
      </Form>
    )

    return (
      <React.Fragment>
        <Layout className="timer-form">
          <Row type="flex" align="middle" justify="end" style={{ height: '70px' }}>
            <Col style={{ flexGrow: 1, flexWrap: 'nowrap' }}>
              <Form layout="inline">
                <Input
                  name="activity"
                  value={description}
                  placeholder="What are you working on today?"
                  onChange={this.onChange}
                  className="timeEntryInput"
                  style={{ width: '100%' }}
                />
              </Form>
            </Col>
            <Col span={8} style={{ width: '400px' }}>
              <Row type="flex" justify="space-between" align="middle">
                <Col span={8}>
                  <Select
                    labelInValue
                    notFoundContent="Please Add Project"
                    onChange={this.onSelectChange}
                    defaultValue={defaultValue}
                    key={getFirstProject.id}
                    style={{ width: '100%', margin: '0' }}
                  >
                    {getAllProjects.map((pr) => <Option key={pr.id}>{pr.name}</Option>)}
                  </Select>
                </Col>
                <Col span={3}>
                  <Popover
                    placement="bottom"
                    title="Projects"
                    trigger="click"
                    content={modalForm}
                  >
                    <Icon
                      style={{ fontSize: '150%' }}
                      className="icon"
                      type="folder-add"
                      title="Create Project"
                    />
                  </Popover>
                </Col>
                <Col span={12}>
                  <Timer />
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            visible={this.state.visible}
            title="Create New Project"
            onOk={this.onSubmit}
            okText="Create Project"
            onCancel={() => this.setState({ visible: false })}
          >
            <Form onSubmit={this.onSubmit}>
              <Form.Item {...formItemLayout} label="Project">
                <Input
                  name="project"
                  value={this.state.project}
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Hourly Rate (Optionally)">
                <Input
                  name="hourlyRate"
                  value={this.state.hourlyRate}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Layout>
      </React.Fragment>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 18 }
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 12 }
  }
}
