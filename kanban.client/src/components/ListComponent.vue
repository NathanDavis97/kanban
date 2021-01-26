<template>
  <div class="listComponent col">
    <div class="row scroll">
      <div class="col-3 bg-light ">
        {{ listProp.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

import { AppState } from '../AppState'
export default {
  name: 'ListComponent',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
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
