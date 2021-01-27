import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasks)
      .post('', this.create)

      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      req.query.user = req.params.user
      const data = await listsService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const data = await tasksService.find({ listId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const data = await listsService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.user = req.params.user

      const data = await listsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await listsService.delete(req)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
