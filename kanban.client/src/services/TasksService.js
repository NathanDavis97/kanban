import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const task = '/tasks/'
class TasksService {
  // NOTE match tasks and comment service to this service
  async getAllTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    console.log(res.data)
    AppState.tasks = res.data
    // push tasks into list at id  of this
  }

  async create(newTask, id) {
    console.log(id)
    newTask.creatorId = AppState.account.id
    newTask.listId = id
    // console.log(newTask.user)

    const res = await api.post('api/tasks', newTask)
    logger.log(res.data)
    AppState.tasks = [...AppState.tasks, res.data]
  }

  async delete(id) {
    // AppState.boards = []
    const res = await api.delete('api' + task + id)
    logger.log(res.data)
    // const index = AppState.boards.findIndexOf(b => b.id === id)
    // AppState.boards.splice(index, 1)
    this.getAllTasks()
  }
}

export const tasksService = new TasksService()

// NOTE  Make front end of tasks and comments
