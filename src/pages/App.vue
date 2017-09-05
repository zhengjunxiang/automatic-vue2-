<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
html, body {
  height: 100%;
}
.app-container {
  height: 100%;
}
</style>
