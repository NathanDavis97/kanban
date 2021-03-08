import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async find(query = {}) {
    const boards = await dbContext.Boards.find(query).populate('creator')
    return boards
  }

  async findById(id) {
    const board = await dbContext.Boards.findById(id).populate('creator')
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async create(data) {
    return await dbContext.Boards.create(data)
  }

  async delete(req) {
    const board = await dbContext.Boards.findOneAndDelete({ _id: req.params.id, creatorId: req.userInfo.id })
    if (!board) {
      throw new BadRequest('You are not the owner, or this is not a valid board')
    }
    return 'Deleted'
  }
}
export const boardsService = new BoardsService()
