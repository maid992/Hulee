import { observable, action, computed, autorun } from 'mobx'
import { AppState } from './AppState'
import moment from 'moment'
import _ from 'lodash'

type ID = number

export type TimeEntryProps = {
  at?: string
  description?: string
  projectId?: ID
  start?: string
  stop?: string
}

export class TimeTrackingStore {
  @observable projects = new Map<number, ProjectModel>()
  @observable timeEntries = new Map<number, TimeEntryModel>()
  @observable currentProject: ID
  @observable currentTimeEntry: string

  /**
   * timeEntryAdd
   * timeEntryDelete
   * timeEntryUpdate
   * timerContinueTimeEntry
   */

  constructor (root: AppState) {
    // this.timerState = root.timerState

    this.projects.set(projekt1.id, projekt1)
    this.setCurrentProject(projekt1.id)
    this.timeEntries.set(aktiviti.getId, aktiviti)
    this.timeEntries.set(aktiviti1.getId, aktiviti1)
  }

  @computed
  get sortedAndGroupedTimeEntries (): TimeEntryModel[] {
    const grouped = _.groupBy(this.getProjectActivities, 'date')

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
  addProject (name: string, hRate: number, currency: string) {
    const project = new ProjectModel(name, hRate, currency)
    this.projects.set(project.id, project)
    this.currentProject = project.id
  }

  @action
  setCurrentProject (id: number) {
    this.currentProject = id
  }

  @action
  saveTimeEntry = (data: TimeEntryModel) => {
    if (this.currentProject) {
      this.timeEntries.set(data.getId, data)
    }
    return
  }

  @computed
  get getAllProjects () {
    const projects = Array.from(this.projects.values())
    return projects
  }

  @computed
  get getProjectActivities (): TimeEntryModel[] {
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

  constructor (name, rate, currency) {
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
  changeProject (pid: number) {
    this.projectId = pid
  }

  @computed
  get date (): string {
    const date = moment(this.at).format('D MMMM YYYY').toString()
    return date
  }

  @computed
  get duration (): string {
    const start = moment.utc(this.start, "HH:mm:ss")
    const stop = moment.utc(this.stop, "HH:mm:ss")
    const v = moment
      .utc(moment.duration(stop.diff(start), 'milliseconds').asMilliseconds())
      .format('H:mm:ss')
    return  v
  }
}

// const ID = () => '_' + Math.random().toString(36).substr(2, 9)
const ID = (): number => parseInt(Math.random().toString().slice(2, 11), 36)

const projekt1 = new ProjectModel('WorkManagmentSite', 33, 'EUR')
const aktiviti = new TimeEntryModel({
  at: '2018-08-22T11:25:49+00:00',
  description: 'FxingNavBar',
  projectId: 3,
  start: '22.11',
  stop: '3'
})
const aktiviti1 = new TimeEntryModel({
  at: '2018-07-19T11:25:49+00:00',
  description: 'FxingNavBar',
  projectId: 3,
  start: '22.11',
  stop: '3'
})
