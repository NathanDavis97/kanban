<template>
  <div class="QuickModal">
    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ state.activeTask.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row justify-content-between justify-content-center">
            <h5 class="col text-center">
              Where would you like to move this task to?
            </h5>
            <div class="col">
              <ModalBody v-for="list in state.lists"
                         :key="list.id"
                         :list-prop="list"
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <!-- <button type="button" class="btn btn-primary">
                Save
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'

export default {
  name: 'QuickModal',
  props: { listsProp: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      activeTask: computed(() => AppState.activeTask),
      lists: computed(() => AppState.lists)

    })
    return {
      state

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
