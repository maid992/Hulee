
class AppState {

  projects = new Map()

  addProject(name, rate) {
    const newProject = new Project(name, rate)
    this.projects.set(newProject.id, newProject)
  }

  get projectList () {
    return [...this.projects.values()]
  }
}

class Project {
  name: string
  id: number
  hRate: number
  currency: string = 'EUR'
  activities = new Map()

  constructor(name, hRate) {
    this.id = Math.random() * 100
    this.name = name
    this.hRate = hRate
  }
  addActivity(name, from, to) {
    const newProject = new Activity(name, from, to)
    this.activities.set(newProject.id, newProject)
  }

  get projectList () {
    return [...this.activities.values()]
  }
}

class Activity {
  id: ''
  description: ''
  workedFrom: null
  workedTo: null
  constructor(description, workedFrom, workedTo) {
    this.description = description
    this.workedFrom = workedFrom
    this.workedTo = workedTo
  }
}

const app = new AppState()

app.addProject('haslanje', 13)
app.addProject('bočanje', 343)
app.addProject('fak', 443)

console.log(app.projectList)
