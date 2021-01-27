import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const list = '/lists/'
class ListsService {
  // NOTE match tasks and comment service to this service
  async getAllLists(id) {
    const res = await api.get('api/boards/' + id + '/lists')
    console.log(res.data)
    for (let i = 0; i < res.data.length; i++) {
      AppState.lists[res.data[i]._id] = [res.data[0]]
    }
    return AppState.lists
    // AppState.lists = res.data
  }

  async create(newList, id) {
    console.log(id)
    newList.creatorId = AppState.account.id
    newList.boardId = id
    // console.log(newList.user)

    const res = await api.post('api/lists', newList)
    logger.log(res.data)
    AppState.lists = [...AppState.lists, res.data]
  }

  async delete(id, boardId) {
    // AppState.boards = []
    const res = await api.delete('api' + list + id)
    logger.log(res.data)
    // const index = AppState.boards.findIndexOf(b => b.id === id)
    // AppState.boards.splice(index, 1)
    this.getAllLists(boardId)
  }
}

export const listsService = new ListsService()

// NOTE  Make front end of tasks and comments
