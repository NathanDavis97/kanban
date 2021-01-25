import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async find(query = {}) {
    const boards = await dbContext.Boards.find(query)
    return boards
  }

  async findById(id) {
    const board = await dbContext.Boards.findById(id)
    if (!board) {
      throw new BadRequest('invalid Id')
    }
    return board
  }

  async create(title) {
    return await dbContext.Boards.create(title)
  }

  async delete(id, userId) {
    const board = await dbContext.Boards.findOneAndDelete({ _id: id, creatorId: userId })
    if (!board) {
      throw new BadRequest('You are not the owner, or this is not a valid board')
    }
    return 'delorted'
  }
}
export const boardsService = new BoardsService()
