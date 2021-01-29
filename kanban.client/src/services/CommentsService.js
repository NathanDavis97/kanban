import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const comment = '/comments/'
class CommentsService {
  // NOTE match comments and comment service to this service
  async getAllComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    console.log(res.data, id, 'pretty please')
    AppState.comments[id] = res.data
  }

  async create(newComment, id) {
    console.log(id)
    newComment.creatorId = AppState.account.id
    newComment.taskId = id
    // console.log(newComment.user)

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

// NOTE  Make front end of tasks and comments
