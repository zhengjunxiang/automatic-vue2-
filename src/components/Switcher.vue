<template>
  <div :class="{switcher: true, 'switch-state-close': this.switcherStateClose}">
    <div :class="{'inner-box': true, close: this.switcherStateClose}" @click="handleClick">
      <span class="border-left"></span>
      <span class="border-middle"></span>
      <span class="border-right"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Switcher",
  props: ['switcherStateClose'],
  methods: {
    handleClick: function () {
      this.$emit('changeSidebarState')
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../style/variable/index.less';
  .switcher {
    position: relative;
    height: 50px;
    width: 200px;
    transition: all 0.3s ease;
    .close {
      transform: rotate(90deg);
    }
    .inner-box {
      left: 50%;
      margin-left: -10px;
      top: 50%;
      margin-top: -8px;
      position: absolute;
      display: inline-block;
      height: 16px;
      width: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      span {
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 2px;
        background: @gray;
      }
      .border-left {
        left: 0px;
      }
      .border-middle {
        left: 50%;
        margin-left: -1px;
      }
      .border-right {
        right: 0px;
      }
    }
    .inner-box:hover {
      span {
        background: @base;
      }
    }
  }
  .switch-state-close {
    width: 55px;
  }
</style>
