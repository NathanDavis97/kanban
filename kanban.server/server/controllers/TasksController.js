import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getAllComments)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await tasksService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllComments(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await commentsService.find({ taskId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await tasksService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await tasksService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await tasksService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await tasksService.delete(req.params.id)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
