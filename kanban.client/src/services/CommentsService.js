import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const comment = '/comments/'
class CommentsService {
  // NOTE match comments and comment service to this service
  async getAllComments(id) {
    const res = await api.get('api/tasks/' + id + '/comments')
    // console.log(res.data)
    AppState.comments = res.data
  }

  async create(newComment, id) {
    console.log(id)
    newComment.creatorId = AppState.account.id
    newComment.taskId = id
    // console.log(newComment.user)

    const res = await api.post('api/comments', newComment)
    logger.log(res.data)
    AppState.comments = [...AppState.comments, res.data]
  }

  async delete(id) {
    const res = await api.delete('api' + comment + id)
    logger.log(res.data)
    this.getAllComments()
  }
}

export const commentsService = new CommentsService()

// NOTE  Make front end of tasks and comments
