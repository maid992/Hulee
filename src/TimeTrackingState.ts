import { observable, action, computed } from 'mobx'

type Slug = string | number

export class TimeTrackingState {
  @observable projects = new Map<Slug, ProjectModel>()
  @observable activities = new Map<Slug, ActivityModel>()

  constructor() {
    this.projects.set(projekt.name, projekt)
    this.projects.set(projekt1.name, projekt1)
    this.activities.set(aktiviti.description, aktiviti)
    this.activities.set(aktiviti3.description, aktiviti3)
    this.activities.set(aktiviti2.description, aktiviti2)
    console.log('PROJECTS: ', [...this.projects.entries()])
  }

  @action
  addProject (name: string, hRate: number, currency: string) {
    const project = new ProjectModel(name, hRate, currency)
    this.projects.set(project.id, project)
  }

  @action
  addActivity = (description: string, date: number, projectId: string) => {
    const desc = description ? description : 'Unnamed activity'
    if (projectId) {
      const activity = new ActivityModel(desc, date, projectId)
      this.activities.set(activity.id, activity)
    }
    return
  }

  @computed
  get getAllProjects () {
    const projects = Array.from(this.projects.values())
    console.log('PROJECTSSS: ', projects)
    return projects
  }

  @action
  getFirstProject () {
    return this.projects.entries().next().value
  }

  getProjectActivities (projectId) {
    const acty = Array.from(this.activities.values())
    console.log(acty)
    return acty.filter((a) => a.projectId === projectId)
  }
}

class ProjectModel {
  @observable id: string
  @observable name: string
  @observable hRate: number
  @observable currency: string

  constructor (name, hRate, currency) {
    this.id = '_' + Math.random().toString(36).substr(2, 9)
    this.name = name
    this.hRate = hRate
    this.currency = currency
  }
}

class ActivityModel {
  @observable id: string
  @observable projectId: string
  @observable description: string
  @observable date: string
  @observable workedFrom: number
  @observable workedTo: number
  @observable time: number

  constructor (description, date, projectId) {
    this.id = ID()
    this.description = description
    this.date = date
    this.projectId = projectId
  }
}

const ID = () => '_' + Math.random().toString(36).substr(2, 9)

const projekt = new ProjectModel('MyPortfolio', 33, 'EUR')
const projekt1 = new ProjectModel('WorkManagmentSite', 33, 'EUR')
const aktiviti = new ActivityModel('fixingNavBar', 22.11, 'MyPortfolio')
const aktiviti2 = new ActivityModel('fixingLoading', 22.11, 'MyPortfolio')
const aktiviti3 = new ActivityModel('fixingAvatar', 22.11, 'WorkManagmentSite')
