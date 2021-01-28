<template>
  <div class="CommentComponent
  "
  >
    <button class="btn btn-danger col" @click="remove">
      Kill..me please
    </button>
    {{ commentProp.body }}
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {

  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
    })
    return {
      state,

      remove() {
        try {
          commentsService.delete(props.commentProp._id, props.commentProp.taskId)
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
