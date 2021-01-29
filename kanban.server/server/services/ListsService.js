import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async find(query = {}) {
    const lists = await dbContext.Lists.find(query).populate('creator')
    return lists
  }

  async findById(id) {
    const list = await dbContext.Lists.findById(id)
    if (!list) {
      throw new BadRequest('invalid Id')
    }
    return list
  }

  async create(title) {
    return await dbContext.Lists.create(title)
  }

  async delete(req) {
    const list = await dbContext.Lists.findOneAndDelete({ _id: req.params.id, creatorId: req.userInfo.id })
    if (!list) {
      throw new BadRequest('You are not the owner, or this is not a valid list')
    }
    return 'delorted'
  }
}
export const listsService = new ListsService()
