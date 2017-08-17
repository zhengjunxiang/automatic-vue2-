<template>
  <div class="platform-plane">
    <div class="header">
      <h3>{{sunTitle}}</h3>
    </div>
    <div class="content">
      <div class="platformRow">
        <div class="platformTitle">余额总额:</div>
        <div class="platformContent">
          <span>{{sunTotal}}</span>
        </div>
      </div>
      <div class="platformRow">
        <div class="platformTitle">可用资产:</div>
        <div class="platformContent">
          <div v-for="(value, key) in freeInfos">
            <span>{{key}}</span><span>: </span><span> {{value}}</span>
          </div>
        </div>
      </div>
      <div class="platformRow" style="border: 0px">
        <div class="platformTitle">冻结资产:</div>
        <div class="platformContent">
          <div v-for="(value, key) in freezedInfos">
            <span>{{key}}</span><span>: </span><span> {{value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlatformPlane",
  props: ['title', 'infoData'],
  computed: {
    sunTitle: function () {
      return this.title || ''
    },
    sunTotal: function () {
      return this.infoData.funds && this.infoData.funds.asset && this.infoData.funds.asset.total || ''
    },
    freeInfos: function () {
      return this.infoData.funds && this.infoData.funds.free || {}
    },
    freezedInfos: function () {
      return this.infoData.funds && this.infoData.funds.freezed || {}
    }
  }
}
</script>
<style lang="less" scoped>
  .platform-plane {
    border: 1px solid #dddddd;
    float: left;
    width: 47%;
    margin-right: 3%;
    .header {
      padding: 0 10px;
      min-height: 30px;
      line-height: 30px;
      color: #666666;
      font-size: 14px;
      border-bottom: 1px solid #dddddd;
      background: #f3f3f3;
    }
    .content {
      padding: 0 10px;
      font-size: 12px;
      line-height: 28px;
    }
    .platformRow {
      min-height: 28px;
      overflow: hidden;
      border-bottom: 1px solid #dddddd;
      > div {
        float: left;
      }
      .platformTitle {
        width: 150px;
      }
      .platformContent {
      }
    }
  }
</style>
