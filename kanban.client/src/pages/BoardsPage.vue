<template>
  <div class="boardspage container-fluid">
    <div class="row">
      <div class="input-group  mb-3">
        <form class="col-6  d-flex flex-row" @submit.prevent="create">
          <input type="text"
                 v-model="state.newBoard.title"
                 class="form-control shadow"
                 placeholder="New Board Title"
                 aria-label="Recipient's username"
                 aria-describedby="button-addon2"
          >
          <button class="btn btn-outline-success shadow" type="submit" id="button-addon2">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <BoardComponent v-for="board in state.boards" :key="board._id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { boardsService } from '../services/BoardsService'
import BoardComponent from '../components/BoardComponent.vue'
export default {
  name: 'Boardspage',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      newBoard: {}
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          await boardsService.create(state.newBoard, state.account.id)
          state.newBoard.title = ''
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: { BoardComponent }
}
</script>

<style
    BoardComponent lang="scss" scoped>

</style>
