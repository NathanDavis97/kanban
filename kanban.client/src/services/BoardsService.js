import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    console.log(res.data)
    AppState.boards = res.data
  }

  async getOneBoard(id) {
    const res = await api.get('api/boards/' + id)
    console.log(res.data, 'help')
    AppState.activeBoard = res.data
  }

  async create(newBoard) {
    newBoard.creatorId = AppState.account.id
    // newBoard.user = id
    // console.log(newBoard.user)

    const res = await api.post('api/boards', newBoard)
    logger.log(res.data)
    AppState.boards = [...AppState.boards, newBoard]
  }

  async delete(id) {
    // AppState.boards = []
    const res = await api.delete('api/boards/' + id)
    logger.log(res.data)
    // const index = AppState.boards.findIndexOf(b => b.id === id)
    // AppState.boards.splice(index, 1)
    this.getAllBoards()
  }
}

export const boardsService = new BoardsService()
