<template>
  <div class="container-fluid">
    <div class=" col-12 activeBoard ">
      <h3>{{ state.board.title }}</h3>
      <div class="input-group row mb-3">
        <form @submit.prevent="create" class="col-6 d-flex flex-row">
          <input type="text"
                 v-model="state.newList.title"
                 class="form-control shadow"
                 placeholder="New List Title"
          >
          <button class="btn btn-success shadow" type="submit" id="button-addon2">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </form>
      </div>
      <div class="row">
        <ListComponent v-for="list in state.lists" :key="list.id" :list-prop="list" />
      </div>
    </div>
    <QuickModal :lists-prop="state.lists" />
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
      activeTask: computed(() => AppState.activeTask),
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
          state.newList.title = ''
        } catch (error) {

        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.overflow{ max-width: 1000px;
    overflow-x: scroll;

}
</style>
