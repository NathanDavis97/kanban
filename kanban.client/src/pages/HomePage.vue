<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <router-link :to="{name: 'Boards'}">
      <img src="https://placehold.it/200x200" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
