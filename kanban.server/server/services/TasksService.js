import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async find(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator')
    return tasks
  }

  async findById(id) {
    const task = await dbContext.Tasks.findById(id).populate('creator')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async create(title) {
    return await dbContext.Tasks.create(title)
  }

  async edit(update) {
    return await dbContext.Tasks.findOneAndUpdate({ _id: update.id, creatorId: update.creatorId }, update, { new: true }).populate('creator')
  }

  async delete(id) {
    const task = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!task) {
      throw new BadRequest('You are not the owner, or this is not a valid task')
    }
    return 'Deleted'
  }
}
export const tasksService = new TasksService()
