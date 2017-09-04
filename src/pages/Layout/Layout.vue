<template>
  <div>
    <header-nav></header-nav>
    <Row :class="{contantor: true, 'app-state-close': this.appStateClose}">
      <Col :class="{sidebar: true, 'state-close': this.appStateClose}">
        <sidebar @changeAppState="changeAppState" :sidebarStateClose="appStateClose"></sidebar>
      </Col>
      <Col class="views">
        <transition name="fade" mode="out-in" appear>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
import HeaderNav from './Header';
import Sidebar from './Sidebar';

export default {
  name: 'Layout',
  components: {
    HeaderNav,
    Sidebar
  },
  methods: {
    changeAppState() {
      this.appStateClose = !this.appStateClose;
    }
  },
  data () {
    return {
      appStateClose: false
    }
  }
}
</script>

<style lang="less">
@import '../../style/variable/index.less';
@import './layout.less';
</style>
