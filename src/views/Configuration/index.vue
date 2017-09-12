<template>
  <Tabs value="api" class="configuration" @on-click="handleTabClick">
    <Tab-pane label="API信息" name="api">
      <api-info ref="api"></api-info>
    </Tab-pane>
    <Tab-pane label="交易所信息" name="platform">
      <platform-info ref="platform"></platform-info>
    </Tab-pane>
  </Tabs>
</template>
<script>
import ApiInfo from './APIInfo'
import PlatformInfo from './PlatformInfo'
export default {
  name: "Configuration",
  components: {
    ApiInfo,
    PlatformInfo
  },
  data () {
    return {
      currentTab: 'api'
    }
  },
  methods: {
    handleTabClick(tab) {
      if (this.currentTab !== tab) {
        this.currentTab = tab;
        this.$refs[tab].fetchData();
      }
    }
  }
}
</script>
<style lang="less">
.configuration {
  .api-header {
    overflow: hidden;
    padding-bottom: 20px;
  }
  .api-title {
    float: left;
  }
  .api-add-btn {
    float: right;
  }
}
</style>
