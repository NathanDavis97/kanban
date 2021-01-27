import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: {
      type: String, required: true
    },
    creatorId: { type: String },
    listId: {
      type: String,
      ref: 'List',
      required: true
    }
  }
)
export default Task
