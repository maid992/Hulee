import React from 'react'
import { AppState } from './AppState'
import { observer } from 'mobx-react'
import { consume, AppContext } from './consume'
import { Button, Form, Input } from 'antd'

@consume(AppContext.Consumer)
@observer
export class Trail extends React.Component<{
  state?: AppState
}> {
  state = {
    value: ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.state.changePage(this.state.value)
    this.setState({ value: '' })
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleCount = () => {
    const count = this.props.state.count + 1
    this.props.state.updateCount(count)
  }
  render () {
    return (
      <div>
        {this.props.state.count}
        {this.props.state.currentPage.map((page) => <p key={page}>{page}</p>)}
        <Form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.value}
            placeholder="Change Page"
            onChange={this.handleChange}
          />
          <Button htmlType="submit">Submit</Button>
        </Form>
        <Button onClick={this.handleCount}>Increase Count</Button>
      </div>
    )
  }
}
