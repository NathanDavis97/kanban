import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const comment = '/comments/'
class CommentsService {
  async getAllComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    logger.log(res.data, id)
    AppState.comments[id] = res.data
  }

  async create(newComment, id) {
    logger.log(id)
    newComment.creatorId = AppState.account.id
    newComment.taskId = id

    const res = await api.post('api/comments', newComment)
    logger.log(res.data)
    this.getAllComments(id)
  }

  async delete(id, taskId) {
    const res = await api.delete('api' + comment + id)
    logger.log(res.data)
    this.getAllComments(taskId)
  }
}

export const commentsService = new CommentsService()
