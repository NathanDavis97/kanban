import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const list = '/lists/'
class ListsService {
  async getAllLists(id) {
    const res = await api.get('api/boards/' + id + '/lists')
    logger.log(res.data)
    AppState.lists = res.data
  }

  async create(newList, id) {
    logger.log(id)
    newList.creatorId = AppState.account.id
    newList.boardId = id

    const res = await api.post('api/lists', newList)
    logger.log(res.data)
    AppState.lists = [...AppState.lists, res.data]
  }

  async delete(id, boardId) {
    const res = await api.delete('api' + list + id)
    logger.log(res.data)
    this.getAllLists(boardId)
  }
}

export const listsService = new ListsService()
