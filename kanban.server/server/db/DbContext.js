import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import ListSchema from '../models/ListModel'
import TaskSchema from '../models/TaskModel'
import CommentSchema from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Boards = mongoose.model('Board', BoardSchema);
  Lists = mongoose.model('List', ListSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
