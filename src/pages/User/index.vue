<template>
  <Tabs value="sum" class="user-page">
    <Tab-pane label="余额信息" name="sum">
      <platform-plane v-for="(item, index) in userSunInfoArr" :key="index" :title="item && item.platform" :infoData="item && item.info"></platform-plane>
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
        this.userSunInfoArr = response.data;
      }, error => {
        this.$Message.error(`${error && error.statusText || ''}, 表单userinfo提交失败`);
      })
  },
  data () {
    return {
      userSunInfoArr: [],
    }
  }
}
</script>
