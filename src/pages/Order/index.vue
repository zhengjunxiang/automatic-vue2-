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
import SellAndBuy from './SellAndBuy';
import AsksAndDids from './AsksAndDids';
export default {
  name: 'order',
  components: {
    SellAndBuy,
    AsksAndDids
  }
}
</script>
<style lang="less">
.order-page {
  .ivu-icon-social,.ivu-icon-second {
    font-size: 14px;
    font-weight: bold;
  }
  .ivu-icon-social::before {
    content: '%';
  }
  .ivu-icon-second::before {
    content: 'S';
  }
  .block-dropdown,.ivu-dropdown {
    display: block;
    .ivu-btn {
      width: 100%;
      position: relative;
      min-height: 30px;
      .ivu-icon {
        position: absolute;
        right: 12px;
        top: 10px;
      }
    }
    .ivu-select-dropdown {
      width: 100%;
      left: 0px;
    }
  }
  .ask-row {
    .ivu-table-cell {
      color: red;
    }
  }
  .bids-row {
    .ivu-table-cell {
      color: green;
    }
  }
}
</style>
