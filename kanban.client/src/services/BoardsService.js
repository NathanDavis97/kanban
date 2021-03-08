import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    logger.log(res.data)
    AppState.boards = res.data
  }

  async getOneBoard(id) {
    const res = await api.get('api/boards/' + id)
    logger.log(res.data, 'help')
    AppState.activeBoard = res.data
  }

  async create(newBoard) {
    newBoard.creatorId = AppState.account.id
    const res = await api.post('api/boards', newBoard)
    logger.log(res.data)
    AppState.boards = [...AppState.boards, res.data]
  }

  async delete(id) {
    const res = await api.delete('api/boards/' + id)
    logger.log(res.data)
    this.getAllBoards()
  }
}

export const boardsService = new BoardsService()
