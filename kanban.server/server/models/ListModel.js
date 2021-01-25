import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: {
      type: String, required: true
    },
    creatorId: { type: String },
    boardId: { type: String }
  }
)
export default List
