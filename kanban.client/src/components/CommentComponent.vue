<template>
  <div class="CommentComponent my-2 rounded ">
    <div class="row bg ">
      <i class="fa btn fa-times-circle text-danger col-2" aria-hidden="true" @click="remove" v-if="state.account.id == commentProp.creatorId"></i>
      <div class="font-weight-bold ">
        {{ commentProp.creator.name }}
        <div class="font-weight-normal limit">
          {{ commentProp.body }}
        </div>
      </div>
    </div>
    <div class="row">
    </div>
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
.bg{
  background-color: rgb(202, 197, 197);
  border-radius: 25px;
}
.limit{
    width: 200px;
    word-wrap: break-word;
}
</style>
