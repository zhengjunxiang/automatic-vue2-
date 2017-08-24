<template>
  <Tabs value="api" class="configuration">
    <Tab-pane label="API信息" name="api">
      <api-info></api-info>
    </Tab-pane>
    <Tab-pane label="交易所信息" name="platform">
      <platform-info></platform-info>
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
    return {}
  },
  methods: {}
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
