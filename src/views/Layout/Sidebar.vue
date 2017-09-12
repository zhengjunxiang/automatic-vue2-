<template>
  <div class="sidebar">
    <switcher @changeSidebarState="changeSidebarState" :switcherStateClose="sidebarStateClose"></switcher>
    <Menu
      theme="dark" :active-name="$route.path" width="auto"
      :class="{'siderbar-state-close': this.sidebarStateClose}"
      >
      <Menu-item name="/home">
        <router-link to="/" exact><Icon type="home"></Icon>首页</router-link>
      </Menu-item>
      <Menu-item name="/order/index">
        <router-link to="/order" exact><Icon type="archive"></Icon>委托下单</router-link>
      </Menu-item>
      <Menu-item name="/configuration/index">
        <router-link to="/configuration" exact><Icon type="ios-settings-strong"></Icon>配置</router-link>
      </Menu-item>
      <Menu-item name="/user/index">
        <router-link to="/user" exact><Icon type="person"></Icon>用户</router-link>
      </Menu-item>
    </Menu>
  </div>
</template>
<script>
import Switcher from './Switcher.vue';

export default {
  name: "Sidebar",
  props: ["sidebarStateClose"],
  components: {
    switcher: Switcher
  },
  methods: {
    changeSidebarState() {
      this.$emit('changeAppState')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable/index.less';
.sidebar {
  .ivu-menu {
    .ivu-menu-item {
      padding: 0px;
      height: 50px;
      line-height: 50px;
      a {
        color: @gray;
        display: inline-block;
        padding-left: 21px;
        width: 100%;
        .ivu-icon {
          transition: all 0.3s ease;
          margin-right: 12px;
          font-size: 18px;
        }
      }
      .router-link-active {
        color: @base;
      }
    }
    .ivu-menu-item:hover a {
      color: #ffffff !important;
    }
  }
  .siderbar-state-close {
    .ivu-menu-item {
      a .ivu-icon {
        margin-right: 30px;
      }
    }
  }
}
</style>
