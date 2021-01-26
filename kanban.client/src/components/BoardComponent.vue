<template>
  <div class="board">
    <div class="card">
      <div class="card-body">
        <router-link :to="{ name: 'ActiveBoard', params: {id: boardProp.id}}">
          <h4 class="card-title">
            {{ boardProp.title }}
          </h4>
        </router-link>
        <p>{{ boardProp.id }}</p>
        <button class="btn btn-danger" @click="remove">
          Kill..me
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Board',
  props: {
    boardProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      remove() {
        try {
          boardsService.delete(props.boardProp.id)
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
