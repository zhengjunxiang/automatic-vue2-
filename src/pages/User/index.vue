<template>
  <Tabs value="sum" class="user-page">
    <Tab-pane label="余额信息" name="sum">
      <div class="platform-plane-container">
        <platform-plane :title="userSunHeader" :infoData="userSunInfo"></platform-plane>
      </div>
    </Tab-pane>
    <Tab-pane label="账户信息" name="account">
      <h2>账户信息</h2>
    </Tab-pane>
  </Tabs>
</template>
<script>
import PlatformPlane from './PlatformPlane';
export default {
  name: 'User',
  components: {
    PlatformPlane
  },
  created () {
    this.$http.get('http://192.168.170.104:8080/userinfo')
      .then(response => {
        this.$store.state.userSunInfo = response.data;
        const userSunInfo = {...response.data};
        this.userSunHeader = userSunInfo.platform;
        this.userSunInfo = userSunInfo.info || {};
      }, error => {
        console.table(error);
      })
  },
  data () {
    return {
      userSunHeader: '',
      userSunInfo: {}
    }
  }
}
</script>
<style lang="less" scoped>
  .user-page {
    .platform-plane-container {
      float: left;
      width: 47%;
      margin-right: 3%;
    }
  }
</style>
