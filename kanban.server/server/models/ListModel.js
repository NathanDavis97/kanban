import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: {
      type: String, required: true
    },
    creatorId: { type: String },
    boardId: { type: String, ref: 'Board', required: true }
  }
)
List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default List
