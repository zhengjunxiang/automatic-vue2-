<template>
  <Row :gutter="30" class="order-page" id="orderPageBox">
    <Col span="24" class="deals-change-box" id="dealsChangeBox">
      <Menu mode="horizontal" active-name="btc_cny" style="margin-bottom: 10px;" @on-select="handleDealSelect">
        <Menu-item name="btc_cny">
          BTC交易
        </Menu-item>
        <Menu-item name="ltc_cny">
          LTC交易
        </Menu-item>
      </Menu>
    </Col>
    <div class="middle-box" id="middleBox">
      <Col :md="12">
        <sell-and-buy :symbol="symbol"></sell-and-buy>
      </Col>
      <Col :md="12">
        <asks-and-dids :symbol="symbol" ref="asksAndDids"></asks-and-dids>
      </Col>
    </div>
    <Col span="24" class="logInformation-box" id="logInformationBox">
      <log-information :symbol="symbol" ref="logInformation"></log-information>
    </Col>
  </Row>
</template>
<script>
import SellAndBuy from './SellAndBuy';
import AsksAndDids from './AsksAndDids';
import LogInformation from './LogInformation';
export default {
  name: 'order',
  data () {
    return {
      symbol: 'btc_cny',
      type: {
      }
    }
  },
  components: {
    SellAndBuy,
    AsksAndDids,
    LogInformation
  },
  methods: {
    handleDealSelect(name) {
      this.symbol = name;
      setTimeout(() => {
        this.$refs.asksAndDids.fetchAsksAndDidsData();
        this.$refs.logInformation.fetchDealsTradeList();
        this.$refs.logInformation.fetchHistoryTradeList();
      }, 60);
    }
  },
  mounted () {
    const dealsChangeBoxDom = document.getElementById('dealsChangeBox');
    const middleBoxDom = document.getElementById('middleBox');
    const logInformationBoxDom = document.getElementById('logInformationBox');
    const orderPageBoxDom = document.getElementById('orderPageBox');
    middleBoxDom.style.height = orderPageBoxDom.offsetHeight - dealsChangeBoxDom.offsetHeight - logInformationBoxDom.offsetHeight + 'px';
    window.onresize = () => {
      middleBoxDom.style.height = orderPageBoxDom.offsetHeight - dealsChangeBoxDom.offsetHeight - logInformationBoxDom.offsetHeight + 'px';
    };
  }
}
</script>
<style lang="less">
@import '../../style/variable/index.less';
@import './index.less';
</style>
