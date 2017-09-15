<template>
  <div>
    <navbar />
    <Row :class="{contantor: true, 'app-state-close': this.appStateClose}">
      <Col :class="{sidebar: true, 'state-close': this.appStateClose}">
        <sidebar @changeAppState="changeAppState" :sidebarStateClose="appStateClose" />
      </Col>
      <Col class="views">
        <app-main />
      </Col>
    </Row>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './index';

export default {
  name: 'Layout',
  components: {
    Navbar,
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
