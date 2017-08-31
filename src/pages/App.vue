<template>
  <div id="app">
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
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default {
  name: 'App',
  components: {
    headerNav: Header,
    sidebar: Sidebar
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
@import '../style/variable/index.less';
@import './app.less';
</style>
