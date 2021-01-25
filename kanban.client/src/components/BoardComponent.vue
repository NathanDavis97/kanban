<template>
  <div class="board">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">
          {{ boardProp.title }}
        </h4>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Board',
  props: {
    boardProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return { state }
    // NOTE working on deleting boards
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
