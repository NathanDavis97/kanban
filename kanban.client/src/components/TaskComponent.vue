<template>
  <div class="TaskComponent
  "
  >
    {{ taskProp.listId }}
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

</style>
