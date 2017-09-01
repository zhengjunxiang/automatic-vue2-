<template>
  <div>
    <header-nav></header-nav>
    <Row :class="{contantor: true, 'app-state-close': this.appStateClose}">
      <Col :class="{sidebar: true, 'state-close': this.appStateClose}">
        <sidebar @changeAppState="changeAppState" :sidebarStateClose="appStateClose"></sidebar>
      </Col>
      <Col class="views">
        <app-main></app-main>
      </Col>
    </Row>
  </div>
</template>

<script>
import Header from './Header';
import Sidebar from './Sidebar';
import AppMain from './AppMain';

export default {
  name: 'Layout',
  components: {
    Header,
    Sidebar,
    AppMain
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
