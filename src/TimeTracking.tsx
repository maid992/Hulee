import React from 'react'
import { observer } from 'mobx-react'
import { consume, AppContext, AppContextProps } from './consume'
import { Button, Form, Input, Modal, Select, Layout } from 'antd'
import { TimeTrackingTable } from './TimeTrackingTable'
import { Timer } from './Timer'

const Option = Select.Option

@consume(AppContext.Consumer)
@observer
export class TimeTracking extends React.Component<AppContextProps> {
  state = {
    project: '',
    hourlyRate: null,
    currency: 'EUR',
    visible: false,
    activity: ''
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

  onChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value }, () =>
      this.props.timeTrackingState.setCurrentActivity(this.state.activity)
    )
  }

  onSelectChange = (value: string) => {
    const name = value.toString()
    this.props.timeTrackingState.setCurrentProject(name)

    console.log('SELECT: ', typeof value)
  }

  render () {
    const { getAllProjects, getCurrentProject } = this.props.timeTrackingState

    // const defaultValue = getLastProject === undefined ? '' : getLastProject.name

    return (
      <React.Fragment>
        <h2>{this.props.locationState.currentPage}</h2>
        <Timer />
        <br />
        <Form>
          <Input
            name="activity"
            value={this.state.activity}
            placeholder="What are you working on today?"
            onChange={this.onChange}
          />
          <Select
            notFoundContent="Please Add Project"
            onChange={this.onSelectChange}
            key={getCurrentProject}
            defaultValue={getCurrentProject}
          >
            {getAllProjects.map((pr) => <Option key={pr.name}>{pr.name}</Option>)}
          </Select>
        </Form>
        <br />
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
