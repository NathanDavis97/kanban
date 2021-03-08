<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <h1>Welcome to KanBan</h1>
    <p>Login and click below to get started!</p>
    <router-link :to="{name: 'Boards'}">
      <img class="rounded-lg " src="https://www.integrify.com/site/assets/files/2473/kanban-project-management.png" alt="">
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
