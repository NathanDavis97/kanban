<template>
  <div class="TaskComponent
  "
  >
    {{ taskProp.title }} <button class="btn btn-danger col" @click="remove">
      Kill..me
    </button>

    <form @submit.prevent="create">
      <input type="text"
             v-model="state.newComment.body"
             class="form-control"
             placeholder="New comment Title"
      >
      <button class="btn btn-outline-primary" type="submit" id="button-addon2">
        Add
      </button>
    </form>
    <CommentComponent v-for="comment in state.comments" :key="comment._id" :comment-prop="comment" />
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
</style>
