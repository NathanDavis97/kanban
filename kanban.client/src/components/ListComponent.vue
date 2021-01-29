<template>
  <div class="listComponent col">
    <div class="row ">
      <div class="col-3 bg-light ">
        <div class="card">
          <div class="card-header">
            <div class="row justify-content-between">
              <h4 class="card-title col ">
                {{ listProp.title }}
                {{ listProp._id }}
              </h4>
              <button class="btn btn-danger col" @click="remove">
                Kill..me
              </button>
            </div>
            <div class="row">
              <div class="input-group mb-3">
                <form @submit.prevent="create">
                  <input type="text"
                         v-model="state.newTask.title"
                         class="form-control"
                         placeholder="New task Title"
                  >
                  <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">
              <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  name: 'ListComponent',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks[props.listProp._id]),
      board: computed(() => AppState.activeBoard),
      newTask: {}

    })
    onMounted(async() => {
      console.log(props.listProp._id)
      try {
        await tasksService.getAllTasks(props.listProp._id
        )
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async create() {
        try {
          console.log(props.listProp._id)
          await tasksService.create(state.newTask, props.listProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      remove() {
        try {
          console.log(props.listProp._id)
          listsService.delete(props.listProp._id, state.board.id)
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
