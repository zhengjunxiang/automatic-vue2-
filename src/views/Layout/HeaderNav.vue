<template>
<div class="Header">
  <div class="logo">
    <h1>自动下单系统</h1>
  </div>
  <div class="avatar-container">
    <!-- <Avatar icon="person" /> -->
    <Button type="ghost" :loading="loading" @click="handleExit">退出</Button>
  </div>
</div>
</template>
<script>
export default {
  name: 'Header',
  data: () => ({
    loading: false
  }),
  methods: {
    handleExit() {
      this.$Modal.confirm({
        content: '<h3>确认退出吗？</h3>',
        onOk: () => {
          this.$store.dispatch('FedLogOut').then(() => {
            window.setTimeout(() => {
              this.$router.push({
                name: 'Login'
              });
            }, 600);
          });
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable/index.less';
.Header {
    height: 60px;
    background: @dark;
    line-height: 60px;
    padding: 0 40px;
    overflow: hidden;
    .logo {
        display: inline-block;
        height: 60px;
        float: left;
        color: #efefef;
    }
    .avatar-container {
        float: right;
        font-size: 14px;
        color: #ffffff;
        line-height: 60px;
        height: 60px;
        .ivu-btn {
            color: @base-light;
            border: 1px solid @base-light;
        }
    }
}
</style>
