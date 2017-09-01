<template>
  <div class="Header">
    <div class="logo">
      <h1>自动下单系统</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data: () => ({

  })
}
</script>
<style lang="less" scoped>
@import '../../style/variable/index.less';
.Header {
  height: 60px;
  background: @dark;
  line-height: 60px;
  padding: 0px 40px;
  overflow: hidden;
  .logo {
    display: inline-block;
    height: 60px;
    float: left;
    color: #efefef;
  }
}
</style>
