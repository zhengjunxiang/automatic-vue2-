<template>
  <div class="app-container">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
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
