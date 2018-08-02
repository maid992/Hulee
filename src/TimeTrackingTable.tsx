import { Layout, Table, Dropdown, Icon, Badge, Button } from 'antd'
import * as React from 'react'
import { observer } from 'mobx-react'
import { consume, AppContext, AppContextProps } from './consume'

@consume(AppContext.Consumer)
@observer
export class TimeTrackingTable extends React.Component<AppContextProps> {
  render () {
    const columns = [
      { title: 'name', dataIndex: 'name', key: 'name', width: '80%' },
      {
        title: 'Action',
        key: 'operation',
        render: () => <Button type="primary">Edit</Button>
      }
    ]
    const data = []
    const { projects } = this.props.state.timeTrackingState

    console.log('TABLE_DATA: ', projects)
    projects.forEach((pr) => data.push({ key: pr.id, name: pr.name }))

    return (
      <Layout style={{ marginTop: '30px' }}>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={(record, index, indent, expaned) =>
            expaned ? <ExpandedRowRender record={record} /> : null}
          dataSource={data}
          pagination={false}
          showHeader={false}
          size="middle"
          expandRowByClick={true}
        />
      </Layout>
    )
  }
}

@consume(AppContext.Consumer)
@observer
class ExpandedRowRender extends React.Component<AppContextProps & { record?: Record }> {
  render () {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />Finished
          </span>
        )
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
          </span>
        )
      },
      { title: 'Date', dataIndex: 'date', key: 'date' }
    ]

    const data = []
    const activities = this.props.state.timeTrackingState.getProjectActivities(
      this.props.record.name
    )

    activities.map((pr) =>
      data.push({ key: pr.id, name: pr.description, date: pr.date, record: pr.projectId })
    )

    return <Table columns={columns} dataSource={data} size="middle" pagination={false} />
  }
}

type Record = { key: number, name: string }
