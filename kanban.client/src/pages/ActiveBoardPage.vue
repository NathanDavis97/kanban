<template>
  <div class="container-fluid">
    <div class=" col-12 activeBoard ">
      {{ state.board.title }}
      <div class="input-group mb-3">
        <form @submit.prevent="create">
          <input type="text"
                 v-model="state.newList.title"
                 class="form-control"
                 placeholder="New List Title"
          >
          <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
            Add
          </button>
        </form>
      </div>
      <div class="row ">
        <ListComponent v-for="list in state.lists" :key="list.id" :list-prop="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

import { reactive, computed, onMounted } from 'vue'
import { listsService } from '../services/ListsService'
import { boardsService } from '../services/BoardsService'
// import ListComponent from '../components/ListComponent'

export default {
  name: 'ActiveBoard',

  setup() {
    const route = useRoute()
    const state = reactive({
      lists: computed(() => AppState.lists),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      board: computed(() => AppState.activeBoard
      ),
      newList: {}
    })
    onMounted(async() => {
      try {
        await boardsService.getOneBoard(route.params.id)
      } catch (error) {
        logger.error(error)
      }
      try {
        await listsService.getAllLists(state.board.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          await listsService.create(state.newList, state.board.id)
        } catch (error) {

        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
