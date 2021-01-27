import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async find(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('creator')
    return comments
  }

  async findById(id) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('invalid Id')
    }
    return comment
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async delete(id) {
    const comment = await dbContext.Comments.findOneAndDelete({ _id: id })
    if (!comment) {
      throw new BadRequest('You are not the owner, or this is not a valid comment')
    }
    return 'delorted'
  }
}
export const commentsService = new CommentsService()
