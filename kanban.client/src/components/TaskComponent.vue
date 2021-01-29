<template>
  <div class="TaskComponent my-3">
    <div class="card">
      <div class="card-header  ">
        <div class="row">
          <h5>{{ taskProp.title }}</h5>
        </div>
        <div class="row justify-content-between">
          <button class="btn btn-danger col-2" @click="remove" v-if="state.account.id == taskProp.creatorId">
            <i class="fa fa-sm fa-times-circle" aria-hidden="true"></i>
          </button>
          <button @click="getActive"
                  type="button"
                  class="btn btn-warning col-5"
                  data-toggle="modal"
                  data-target="#modelId"
                  v-if="state.account.id == taskProp.creatorId"
          >
            <small>Move Task</small>
          </button>
        </div>
      </div>
      <div class="card-body">
        <CommentComponent v-for="comment in state.comments" :key="comment._id" :comment-prop="comment" />
      </div>
      <div class="card-footer">
        <form @submit.prevent="create">
          <input type="text"
                 v-model="state.newComment.body"
                 class="form-control"
                 placeholder="New comment Title"
                 id="commentForm"
          >
          <button class="btn btn-success" type="submit" id="button-addon2">
            Add
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {

  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists),
      comments: computed(() => AppState.comments[props.taskProp._id]),
      newComment: {}
    })
    onMounted(async() => {
      try {
        await commentsService.getAllComments(props.taskProp._id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          await commentsService.create(state.newComment, props.taskProp._id)
          state.newComment.body = ''
        } catch (error) {
          logger.error(error)
        }
      },
      async getActive() {
        try {
          await tasksService.getOneTask(props.taskProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      remove() {
        try {
          tasksService.delete(props.taskProp._id, props.taskProp.listId)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.comm{
  height: 20px;
}
.card-header{
  margin: 0;
}
</style>
