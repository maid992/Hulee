import { observable, action, computed } from 'mobx'
import { AppState } from './AppState'
import * as moment from 'moment'
import * as _ from 'lodash'
import { TimerState } from './TimerState'

type ID = number

export type TimeEntryProps = {
  at?: string
  description?: string
  projectId?: number
  start?: string
  stop?: string
}

export class TimeTrackingStore {
  @observable projects = new Map<ID, ProjectModel>()
  @observable timeEntries = new Map<ID, TimeEntryModel>()
  @observable currentProject: string
  @observable currentTimeEntry: string

  private timerState: TimerState

  /**
   * timeEntryAdd
   * timeEntryDelete
   * timeEntryUpdate
   * timerContinueTimeEntry
   */

  constructor (root: AppState) {
    this.timerState = root.timerState
  }

  @computed
  get sortedAndGroupedTimeEntries () {
    const grouped = _.groupBy(this.getTimeEntries, 'date')

    const sortedTimeEntries = []
    for (const entryGroup in grouped) {
        sortedTimeEntries.push([entryGroup, grouped[entryGroup]])
    }

    sortedTimeEntries.sort((a, b) => {
      return moment.utc(b[0]).diff(moment.utc(a[0]))
    })

    return sortedTimeEntries
  }

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
  get getTimeEntries (): TimeEntryModel[] {
    const acty = Array.from(this.timeEntries.values()).reverse()
    return acty
  }
}

class ProjectModel {
  @observable active: boolean
  @observable actualHours: number
  @observable at: string
  @observable color: string
  @observable createdAt: string
  @observable currency: string

  @observable id: ID = ID()
  @observable name: string
  @observable rate: number

  constructor (name: string, rate: number, currency: string) {
    this.id = ID()
    this.name = name
    this.rate = rate
    this.currency = currency
  }
}

export class TimeEntryModel {
  @observable at: string
  @observable billable: boolean = false
  @observable description: string

  private id: ID
  @observable projectId: ID

  @observable start: string
  @observable stop: string

  constructor (props?: TimeEntryProps) {
    for (const key in props) {
      (this as any)[key] = (props as any)[key]
    }

    this.id = ID()
  }

  @computed
  get getId () {
    return this.id
  }
  
  @action
  changeProject (pid: ID) {
    this.projectId = pid
  }

  @computed
  get date (): string {
    const date = moment(this.at).format('D MMMM YYYY').toString()
    return date
  }

  @computed
  get duration (): string {
    const start = moment.utc(this.start)
    const stop = moment.utc(this.stop)
    const v = moment
      .utc(moment.duration(stop.diff(start), 'milliseconds').asMilliseconds())
      .format('H:mm:ss')
    return  v
  }
}

// const ID = () => '_' + Math.random().toString(36).substr(2, 9)
const ID = (): number => parseInt(Math.random().toString().slice(2, 11), 36)
