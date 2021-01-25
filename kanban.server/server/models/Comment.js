import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    body: {
      type: String, required: true
    },
    creatorId: { type: String },
    taskId: { type: String }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Comment.virtual('creator', {
  localfield: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
