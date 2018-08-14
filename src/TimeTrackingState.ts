import { observable, action, computed } from 'mobx'

type Slug = string | number

export class TimeTrackingState {
  @observable projects = new Map<Slug, ProjectModel>()
  @observable activities = new Map<Slug, ActivityModel>()
  @observable currentProject: string = ''
  @observable currentActivity: string

  @action
  addProject (name: string, hRate: number, currency: string) {
    const project = new ProjectModel(name, hRate, currency)
    this.projects.set(project.id, project)
    this.currentProject = name
  }

  @action
  setCurrentActivity (activity: string) {
    this.currentActivity = activity
  }

  @computed
  get getCurrentActivity () {
    return this.currentActivity
  }

  @action
  setCurrentProject (name: string) {
    this.currentProject = name
  }
  
  @computed
  get getCurrentProject () {
    return this.currentProject
  }

  @action
  addActivity = (projectName: string, date: number | string, description: string) => {
    const desc = description ? description : 'Unnamed activity'
    if (projectName) {
      const activity = new ActivityModel(projectName, date, desc)
      this.activities.set(activity.id, activity)
    }
    return
  }

  @computed
  get getAllProjects () {
    const projects = Array.from(this.projects.values())
    console.log('PROJECTSSS: ', projects)
    console.log('currentPROJECTSSS: ', this.currentProject)
    return projects
  }

  // @computed get
  // getLastProject () {
  //   return Array.from(this.projects.values()).pop()
  // }

  getProjectActivities (projectId) {
    const acty = Array.from(this.activities.values())
    console.log(acty)
    return acty.filter((a) => a.projectName === projectId)
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
  @observable projectName: string
  @observable description: string
  @observable date: string
  @observable workedFrom: number
  @observable workedTo: number
  @observable time: number

  constructor (projectName, date, description) {
    this.id = ID()
    this.date = date
    this.description = description
    this.projectName = projectName
  }
}

const ID = () => '_' + Math.random().toString(36).substr(2, 9)

  // constructor() {
  //   this.projects.set(projekt.name, projekt)
  //   this.projects.set(projekt1.name, projekt1)
  //   this.activities.set(aktiviti.description, aktiviti)
  //   this.activities.set(aktiviti3.description, aktiviti3)
  //   this.activities.set(aktiviti2.description, aktiviti2)
  //   console.log('PROJECTS: ', [...this.projects.entries()])
  // }

// const projekt = new ProjectModel('MyPortfolio', 33, 'EUR')
// const projekt1 = new ProjectModel('WorkManagmentSite', 33, 'EUR')
// const aktiviti = new ActivityModel('fixingNavBar', 22.11, 'MyPortfolio')
// const aktiviti2 = new ActivityModel('fixingLoading', 22.11, 'MyPortfolio')
// const aktiviti3 = new ActivityModel('fixingAvatar', 22.11, 'WorkManagmentSite')
