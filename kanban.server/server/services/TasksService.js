import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async find(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
    return tasks
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('invalid Id')
    }
    return task
  }

  async create(title) {
    return await dbContext.Tasks.create(title)
  }

  async delete(id, userId) {
    const task = await dbContext.Tasks.findOneAndDelete({ _id: id, creatorId: userId })
    if (!task) {
      throw new BadRequest('You are not the owner, or this is not a valid task')
    }
    return 'delorted'
  }
}
export const tasksService = new TasksService()
