import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    console.log('firing off')
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getOneBoard(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }

  async create(newBoard) {
    const res = await api.post('api/boards', newBoard)
    logger.log(res.data)
    AppState.boards = [...AppState.boards, newBoard]
  }

  async delete(id) {
    const res = await api.delete('api/boards/' + id)
    logger.log(res.data)
    const index = AppState.boards.findIndexOf(b => b.id === id)
    AppState.boards.splice(index, 1)
  }
}

export const boardsService = new BoardsService()
