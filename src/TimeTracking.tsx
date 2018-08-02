import React from 'react'
import { observer } from 'mobx-react'
import { consume, AppContext, AppContextProps } from './consume'
import { Button, Form, Input, Modal, Select } from 'antd'
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
    selectedProject: ''
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.state.timeTrackingState.addProject(
      this.state.project,
      this.state.hourlyRate,
      this.state.currency
    )
    this.setState({ project: '', visible: false, hourlyRate: null })
  }

  onChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value })
  }

  onSelectChange = (value) => {
    this.setState({ selectedProject: value })
    console.log("SELECT: ", value)
  }

  addActivity = (e) => {
    e.preventDefault()
    const addA = this.props.state.timeTrackingState.addActivity
    addA('faklingX', 33.11, this.state.selectedProject)
  }

  render () {
    const projects = this.props.state.timeTrackingState.getAllProjects
    
    return (
      <React.Fragment>
        <h2>{this.props.state.locationState.currentPage}</h2>
        <Button htmlType="submit" onClick={() => this.setState({ visible: true })}>
          Create new Project
        </Button>
        <Form onSubmit={this.addActivity}>
          <Button htmlType="submit" onClick={this.addActivity}>
            Add Activity
          </Button>
          <Select onChange={this.onSelectChange} >
            {projects.map(pr => <Option key={pr.name}>{pr.name}</Option>)}
          </Select>
        </Form>
        <Modal
          visible={this.state.visible}
          title="Create New Project"
          onOk={this.onSubmit}
          okText='Create Project'
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
        <TimeTrackingTable />
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
