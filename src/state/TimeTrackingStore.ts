import { observable, action, computed } from 'mobx'
import { AppState } from './AppState'
import * as moment from 'moment'
import * as _ from 'lodash'
import { TimerState } from './TimerState'
import { TimeEntryModel } from './TimeEntryModel';
import { ProjectModel } from './ProjectModel';

export type ID = number

export type TimeEntryProps = {
  at?: string
  description?: string
  projectId?: number
  start?: string
  stop?: string
}

  /**
   * timeEntryAdd
   * timeEntryDelete
   * timeEntryUpdate
   * timerContinueTimeEntry
   */

export class TimeTrackingStore {
  @observable projects = new Map<ID, ProjectModel>()
  @observable timeEntries = new Map<ID, TimeEntryModel>()
  @observable currentProject: string
  @observable currentTimeEntry: string

  private timerState: TimerState

  constructor (root: AppState) {
    this.timerState = root.timerState
  }

  // Computed

  @computed
  get sortedAndGroupedTimeEntries (): TimeEntryModel[][] {
    const grouped = _.groupBy(this.getAllTimeEntries, 'date')

    const timeEntries: TimeEntryModel[][] = []

    for (const entryGroup in grouped) {
      timeEntries.push([ ...grouped[entryGroup] ])
    }

    timeEntries.sort((a, b) => {
      return moment(b[0].date).diff(moment(a[0].date))
    })

    return timeEntries
  }
  
  @computed
  get getFirstProject (): ProjectModel {
    const project = Array.from(this.projects.values()).pop()
    return project

  }

  @computed
  get getAllProjects () {
    const projects = Array.from(this.projects.values())
    return projects
  }

  @computed
  get getAllTimeEntries (): TimeEntryModel[] {
    const acty = Array.from(this.timeEntries.values()).reverse()
    return acty
  }

  // Actions

  @action
  projectAdd (name: string, hRate: number, currency: string) {
    const project = new ProjectModel(name, hRate, currency)
    this.projects.set(project.id, project)
    this.currentProject = project.name
    this.timerState.changeProject(project.id)
  }

  @action
  setCurrentProject (id: string) {
    this.currentProject = id
  }

  @action
  timeEntryAdd = (data: TimeEntryModel) => {
    if (this.currentProject) {
      this.timeEntries.set(data.getId, data)
    }
    return
  }

  @action
  timeEntryDelete = (id: ID) => {
    this.timeEntries.delete(id)
  }

  @action
  getProjectById (id: ID) {
    return this.projects.get(id)
  }

}

// const ID = () => '_' + Math.random().toString(36).substr(2, 9)
export const ID = (): number => parseInt(Math.random().toString().slice(2, 11), 36)
