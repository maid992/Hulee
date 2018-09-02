import { observable, action, computed } from 'mobx'
import { AppState } from './AppState'
import * as moment from 'moment'
import { TimerStore } from './TimerState'
import { TimeEntryModel } from './TimeEntryModel'
import { ProjectModel } from './ProjectModel'
import { groupBy } from '../lib/groupBy'

export type ID = number

export type TimeEntryProps = {
  at?: string
  description?: string
  projectId?: number
  start?: string
  stop?: string
}

/**
 * timeEntryUpdate
 * timerContinueTimeEntry
 */

export class TimeTrackingStore {
  @observable projects = new Map<ID, ProjectModel>()
  @observable timeEntries = new Map<ID, TimeEntryModel>()
  @observable currentProject: string

  @observable modalVisible: boolean
  @observable popdowns = new Map<ID, boolean>()

  private timerState: TimerStore
  constructor (root: AppState) {
    this.timerState = root.timerStore
  }

  // Computed

  @computed
  get sortedAndGroupedTimeEntries (): TimeEntryModel[][] {
    return groupBy(this.getAllTimeEntries, 'date')
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
  timeEntryGet = (id: ID): TimeEntryModel => {
    return this.timeEntries.get(id)
  }

  @action
  handleModalVisibility = () => {
    this.modalVisible = !this.modalVisible
    this.popdowns.forEach((a, b) => this.handlePopdownVisibility(false, b))
  }

  @action
  handlePopdownVisibility = (visible: boolean, id: number) => {
    this.popdowns.set(id, visible)
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
    this.timeEntries.set(data.getId, data)
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
