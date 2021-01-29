<template>
  <div class="board col-3" v-if="state.account.id == boardProp.creatorId">
    <div class="card shadow">
      <div class="card-header text-right">
        <button class="btn btn-danger " @click="remove" v-if="state.account.id == boardProp.creatorId">
          <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        </button>
      </div>
      <div class="card-body">
        <router-link :to="{ name: 'ActiveBoard', params: {id: boardProp.id}}">
          <h4 class="card-title text-dark ">
            {{ boardProp.title }}
          </h4>
        </router-link>
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
          console.log(props.boardProp.id)
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
.card {
  min-height: 150px;
}

</style>
