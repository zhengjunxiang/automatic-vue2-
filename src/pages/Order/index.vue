<template>
  <Row :gutter="30" class="order-page">
    <Col :md="12">
      <sell-and-buy></sell-and-buy>
    </Col>
    <Col :md="12">
      <asks-and-dids></asks-and-dids>
    </Col>
  </Row>
</template>
<script>
import SellAndBuy from './SellAndBuy.vue';
import AsksAndDids from './AsksAndDids.vue';
export default {
  name: 'order',
  components: {
    sellAndBuy: SellAndBuy,
    asksAndDids: AsksAndDids
  }
}
</script>
<style lang="less">
</style>
