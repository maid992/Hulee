import * as React from 'react'
import { AppContextProps, consumeStore } from '../../state/consume'
import { observer } from 'mobx-react'
import { ProjectItem } from '../ProjectItem/ProjectItem'
import { Icon } from 'antd'
import { TimeEntryModel } from '../../state/TimeEntryModel'

@consumeStore
@observer
export class PopdownContent extends React.Component<
  AppContextProps & { listItem?: TimeEntryModel; id?: number }
> {
  onProjectSelect = (id: number) => {
    const currentTimeEntry = this.props.listItem
    currentTimeEntry.projectId = id

    this.props.timeTrackingStore.timeEntryAdd(currentTimeEntry)
    this.props.timeTrackingStore.handlePopdownVisibility(
      false,
      this.props.listItem.getId || id
    )
  }

  onCurrentProjectChange = (name: string, id: number) => {
    this.props.timeTrackingStore.setCurrentProject(name)
    this.props.timerStore.changeProject(id)
    this.props.timeTrackingStore.handlePopdownVisibility(false, this.props.id)
  }

  render () {
    const {
      getAllProjects,
      handleModalVisibility,
      setCurrentProject
    } = this.props.timeTrackingStore

    const listItem = this.props.listItem
    return (
      <React.Fragment>
        {getAllProjects.map(
          (pr) =>
            listItem ? (
              <div key={pr.id} onClick={() => this.onProjectSelect(pr.id)}>
                <ProjectItem project={pr} />
              </div>
            ) : (
              <div
                key={pr.id}
                onClick={() => this.onCurrentProjectChange(pr.name, pr.id)}
              >
                <ProjectItem project={pr} />
              </div>
            )
        )}
        <div
          className="popover-projects"
          onClick={() => this.onCurrentProjectChange('ProjectLess', null)}
        >
          No Project
        </div>
        <div style={{ borderTop: '1px solid lightGrey', margin: '12px 0 8px 0' }} />
        <div onClick={handleModalVisibility} className="popover-projects">
          <Icon
            style={{ fontSize: '150%', backgroundColor: 'transparent' }}
            className="icon"
            type="folder-add"
            title="Create Project"
          />
          Add Project
        </div>
      </React.Fragment>
    )
  }
}
