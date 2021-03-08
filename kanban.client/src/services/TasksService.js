import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const task = '/tasks/'
class TasksService {
  // NOTE match tasks and comment service to this service
  async getAllTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    logger.log(res.data)
    AppState.tasks[id] = res.data
  }

  async getOneTask(id) {
    const res = await api.get('api/tasks/' + id)
    logger.log(res.data)
    AppState.activeTask = res.data
  }

  async create(newTask, id) {
    newTask.creatorId = AppState.account.id
    newTask.listId = id
    const res = await api.post('api/tasks', newTask)
    logger.log(res.data)
    this.getAllTasks(id)
  }

  async moveTask(newListId, activeTask) {
    const oldListId = activeTask.listId
    activeTask.listId = newListId
    const res = await api.put('api/tasks/' + activeTask._id, activeTask)
    this.getAllTasks(newListId)
    this.getAllTasks(oldListId)
    logger.log(res)
  }

  async delete(id, listId) {
    const res = await api.delete('api' + task + id)
    logger.log(res.data)
    this.getAllTasks(listId)
  }
}

export const tasksService = new TasksService()

// NOTE  Make front end of tasks and comments
