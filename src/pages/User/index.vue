<template>
  <Tabs value="sum" class="user-page">
    <Tab-pane label="余额信息" name="sum">
      <balance :userSunInfo="userSunInfo"></balance>
    </Tab-pane>
    <Tab-pane label="账户信息" name="account">
      <user-info></user-info>
    </Tab-pane>
  </Tabs>
</template>
<script>
import Balance from './Balance';
import UserInfo from './UserInfo';
import config from '@/config';
export default {
  name: 'User',
  components: {
    Balance,
    UserInfo
  },
  data () {
    return {
      userSunInfo: {},
    }
  },
  methods: {
    fetchUserinfo() {
      this.$http.get(`${config.apiHost}/userinfo`)
        .then(response => {
          this.userSunInfo = response.data;
          this.$Message.success('userinfo获取成功');
        }, error => {
          this.$Message.error('userinfo获取失败');
        })
    }
  },
  created () {
    this.fetchUserinfo();
  },
  activated() {
    this.fetchUserinfo();
  }
}
</script>
