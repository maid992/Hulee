import { observable, action, computed } from 'mobx'

export class AppState {
  timeTrackingState = new TimeTrackingState()
  locationState = new LocationState()
}

type Slug = string | number

export class LocationState {
  @observable currentPage: string = 'Projects'
  @observable pageList: string[] = [ 'NoviGod' ]

  addPage (page: string) {
    this.pageList = [ ...this.pageList, page ]
  }

  changePage (page: string) {
    this.currentPage = page
  }
}

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
    const activity = new ActivityModel(description, date, projectId)
    this.activities.set(projectId, activity)
  }

  get getAllProjects () {
    const projects = Array.from(this.projects.values())
    console.log('PROJECTSSS: ', projects)
    return projects
  }

  getProjectActivities (projectId) {
    const acty = Array.from(this.activities.values())
    console.log(acty)
    return acty.filter(a => a.projectId === projectId)
  }
}

class ProjectModel {
  name: string
  id: number
  hRate: number
  currency: string

  constructor(name, hRate, currency) {
    this.id = Math.random() * 100
    this.name = name
    this.hRate = hRate
    this.currency = currency
  }
}

class ActivityModel {
  id: number
  projectId: string
  description: string
  date: string
  workedFrom: number
  workedTo: number
  time: number

  constructor(description, date, projectId) {
    this.id = Math.random() * 100
    this.description = description
    this.date = date
    this.projectId = projectId
  }
}

const projekt = new ProjectModel('MyPortfolio', 33, 'EUR')
const projekt1 = new ProjectModel('WorkManagmentSite', 33, 'EUR')
const aktiviti = new ActivityModel('fixingNavBar', 22.11, 'MyPortfolio')
const aktiviti2 = new ActivityModel('fixingLoading', 22.11, 'MyPortfolio')
const aktiviti3 = new ActivityModel('fixingAvatar', 22.11, 'WorkManagmentSite')
