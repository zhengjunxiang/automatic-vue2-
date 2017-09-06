<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
