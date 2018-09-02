import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'
import { Row, Col, Form, Input, Modal, Layout, Popover, AutoComplete } from 'antd'
import { Timer } from './Timer'
import { LabeledValue, SelectValue } from 'antd/lib/select'
import * as _ from 'lodash'

// TODO Remove local state

type RenderCallback = (args: number) => JSX.Element

@consumeStore
@observer
export class TimerForm extends React.Component<
  AppContextProps & { children?: RenderCallback }
> {
  state = {
    project: '',
    hourlyRate: 0,
    currency: 'EUR',
    visible: false,
    activity: ''
  }

  handleVisibleChange = (visible: boolean) => {
    this.props.timeTrackingStore.handlePopdownVisibility(visible, 333)
  }

  onSubmit = (e: React.MouseEvent<any>) => {
    e.preventDefault()
    this.props.timeTrackingStore.projectAdd(
      this.state.project,
      this.state.hourlyRate,
      this.state.currency
    )
    this.setState({ project: '', visible: false, hourlyRate: null })
    this.props.timeTrackingStore.handleModalVisibility()
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.target.value }, () => {
      this.props.timerStore.changeDescription(this.state.activity)
    })
  }

  onSelectChange = (value: LabeledValue) => {
    this.props.timeTrackingStore.setCurrentProject(value.label.toString())
    this.props.timerStore.changeProject(parseInt(value.key, 10))
  }

  onAutocomplete = (value: SelectValue) => {
    this.props.timerStore.changeDescription(value.toString())
  }

  componentDidMount = () => {
    this.props.timeTrackingStore.handlePopdownVisibility(false, 333)
  }

  render () {
    const {
      getAllTimeEntries,
      handleModalVisibility,
      modalVisible,
      popdowns
    } = this.props.timeTrackingStore

    const { description } = this.props.timerStore

    // Project Popdown
    const project = this.props.timeTrackingStore.currentProject
    const popdownVisible = popdowns.get(333)
    const popdownContent = this.props.children(333)

    const descriptions: string[] = []

    getAllTimeEntries.map((e) => {
      if (!descriptions.includes(e.description) && e.description) {
        descriptions.push(e.description)
      }
    })

    const modalForm = (
      <Form onSubmit={this.onSubmit} style={{ maxWidth: '2000px' }}>
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
    )

    return (
      <React.Fragment>
        <Layout className="timer-form" id="timer-form">
          <Row type="flex" align="middle" justify="end" style={{ height: '70px' }}>
            <Col style={{ flexGrow: 1, flexWrap: 'nowrap', marginRight: 'auto' }}>
              <Form layout="inline">
                <AutoComplete
                  onSelect={this.onAutocomplete}
                  dropdownClassName="autocomplete-dropwdown"
                  className="autocomplete"
                  dataSource={descriptions}
                  backfill
                  getPopupContainer={() => document.getElementById('timer-form')}
                >
                  <Input
                    className="timeEntryInput"
                    name="activity"
                    value={description}
                    placeholder="What are you working on?"
                    onChange={this.onChange}
                    style={{ width: '100%' }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </AutoComplete>
              </Form>
            </Col>
            <Col
              style={{
                minWidth: '50px',
                display: 'inline-block',
                color: '#6e5cd1',
                height: '35px',
                marginTop: '5px'
              }}
            >
              <Popover
                placement="bottom"
                title="Projects"
                trigger="click"
                content={popdownContent}
                visible={popdownVisible}
                onVisibleChange={this.handleVisibleChange}
                getPopupContainer={() => document.getElementById('timer-form')}
              >
                <div className="teProject">
                  <span>
                    <img
                      style={{
                        height: '30px',
                        width: '30px',
                        marginBottom: '3px',
                        display: 'inline-block'
                      }}
                      src="src/img/bullet.svg"
                    />
                  </span>
                  {project}
                </div>
              </Popover>
            </Col>
            <Col style={{ width: '330px' }}>
              <Timer />
            </Col>
          </Row>
          <Modal
            visible={modalVisible}
            title="Create New Project"
            onOk={this.onSubmit}
            okText="Create Project"
            onCancel={handleModalVisibility}
            centered
            width={400}
          >
            {modalForm}
          </Modal>
        </Layout>
      </React.Fragment>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 6 }
  }
}
