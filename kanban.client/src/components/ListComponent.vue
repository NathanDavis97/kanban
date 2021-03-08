<template>
  <div class="listComponent col-3">
    <div class="row ">
      <div class="card shadow bg col">
        <div class="card-header bg-info">
          <div class="row justify-content-between my-2">
            <h4 class="card-title  col ">
              {{ listProp.title }}
            </h4>
            <button class="btn btn-danger mr-1 shadow col-2" @click="remove" v-if="state.account.id == listProp.creatorId">
              <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
            </button>
          </div>
          <div class="row">
            <div class="input-group mb-3">
              <form class="d-flex flex-row justify-content-between" @submit.prevent="create">
                <input type="text"
                       v-model="state.newTask.title"
                       class="form-control shadow col-8"
                       placeholder="New task Title"
                >
                <button class="btn btn-success shadow text-end col" type="submit" id="button-addon2">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="card-body bg-dark">
          <div>
            <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
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
          await tasksService.create(state.newTask, props.listProp._id)
          state.newTask.title = ''
        } catch (error) {
          logger.error(error)
        }
      },
      remove() {
        try {
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
.card{
  min-height: 500px;
  padding: 0;
  margin: 10px;
}
.bg{
  background-color: #ebf1fc;
}
.overflow{ max-width: 500px;
    overflow-y: scroll;

}
</style>
