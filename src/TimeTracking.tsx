import React from 'react'
import { observer } from 'mobx-react'
import { consume, AppContext, AppContextProps } from './consume'
import { Button, Form, Input, Modal, Select, Layout } from 'antd'
import { TimeTrackingTable } from './TimeTrackingTable'

const Option = Select.Option

@consume(AppContext.Consumer)
@observer
export class TimeTracking extends React.Component<AppContextProps> {
  state = {
    project: '',
    hourlyRate: null,
    currency: 'EUR',
    visible: false,
    selectedProject: '',
    activity: '',
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.timeTrackingState.addProject(
      this.state.project,
      this.state.hourlyRate,
      this.state.currency
    )
    this.setState({ project: '', visible: false, hourlyRate: null })
  }

  startCounter = () => {
    this.props.counterState.timer = setInterval(() => {
        this.props.counterState.startCounter()
      }, 1000)
  }

  stopCounter = () => {
    clearInterval(this.props.counterState.timer)
    this.props.counterState.resetCounter()
  }

  onChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value })
  }

  onSelectChange = (value: string) => {
    this.setState({ selectedProject: value })
    console.log('SELECT: ', value)
  }

  addActivity = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const addA = this.props.timeTrackingState.addActivity
    addA(this.state.activity, 33.11, this.state.selectedProject)
  }

  render () {
    const { getAllProjects, getFirstProject, projects } = this.props.timeTrackingState
    const defaultValue = projects ? getFirstProject[0] : 'No Projects'

    return (
      <React.Fragment>
        <h2>{this.props.locationState.currentPage}</h2>
        <h2>{this.props.counterState.time}--{this.props.counterState.startTime}</h2>
        <Button htmlType="submit" onClick={this.startCounter}>
          START
        </Button>
        <Button htmlType="submit" onClick={this.stopCounter}>
          STOP
        </Button>
        <Form onSubmit={this.addActivity}>
          <Input
            name="activity"
            value={this.state.activity}
            placeholder="What are you working on today?"
            onChange={this.onChange}
          />
          <Select
            notFoundContent="Please Add Project"
            placeholder="Select Project"
            onChange={this.onSelectChange}
            defaultValue={defaultValue}
          >
            {getAllProjects.map((pr) => <Option key={pr.name}>{pr.name}</Option>)}
          </Select>
          <Button htmlType="submit" onClick={this.addActivity}>
            Add Activity
          </Button>
        </Form>
        <br/>
        <Button htmlType="submit" onClick={() => this.setState({ visible: true })}>
          Create new Project
        </Button>
        <Modal
          visible={this.state.visible}
          title="Create New Project"
          onOk={this.onSubmit}
          okText="Create Project"
          onCancel={() => this.setState({ visible: false })}
        >
          <Form onSubmit={this.onSubmit}>
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
          </Form>
        </Modal>
        <Layout.Content>
          <TimeTrackingTable />
        </Layout.Content>
      </React.Fragment>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
