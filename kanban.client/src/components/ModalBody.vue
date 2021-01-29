<template>
  <button class="btn btn-primary col my-1" @click="moveTask(listProp._id)">
    {{ listProp.title }}
  </button>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { logger } from '../utils/Logger'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'ModalBody',
  props: {
    listProp: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      activeTask: computed(() => AppState.activeTask)

    })
    return {
      async moveTask(listId) {
        try {
          debugger

          await tasksService.moveTask(listId, state.activeTask)
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
