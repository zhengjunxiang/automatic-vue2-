<template>
  <Tabs value="sell" @on-click="handleTabsClick">
    <Tab-pane label="卖出" name="sell">
      <Form label-position="left" :label-width="90">
        <Form-item label="委托类型：">
          <Row>
            <Col span="18">
              <Dropdown class="block-dropdown" trigger="click" placement="bottom-start" @on-click="handleDropdownSellClick">
                <Button type="ghost">
                  {{sellTypeValue || ''}}
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                  <Dropdown-item v-for="item in tradeTypeArr" :key="item.id" :name="item.id">{{item.name}}</Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </Col>
          </Row>
        </Form-item>

        <div v-show="sellTypeValue === '冰山委托'">
          <SellBingShan ref="SellBingShan"></SellBingShan>
        </div>
        <div v-show="sellTypeValue === '时间加权委托'">
          <SellTimes ref="SellTimes"></SellTimes>
        </div>

        <Form-item>
          <div v-if="FetchTradeType === 'fetching'">
            <Spin></Spin>
          </div>
          <Row v-else-if="FetchTradeType === 'ok'">
            <Col span="18"><Button type="error" @click="handleSubmit" long>卖出</Button></Col>
          </Row>
          <p v-else-if="FetchTradeType === 'error'">TradeType类型获取失败, 请等待工程师修复。</p>
        </Form-item>
      </Form>
    </Tab-pane>

    <Tab-pane label="买入" name="buy">
      <Form label-position="left" :label-width="90">
        <Form-item label="委托类型：">
          <Row>
            <Col span="18">
              <Dropdown class="block-dropdown" trigger="click" placement="bottom-start" @on-click="handleDropdownBuyClick">
                <Button type="ghost">
                  {{buyTypeValue || ''}}
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                  <Dropdown-item v-for="item in tradeTypeArr" :key="item.id" :name="item.id">{{item.name}}</Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </Col>
          </Row>
        </Form-item>

        <div v-show="buyTypeValue === '冰山委托'">
          <BuyBingShan ref="BuyBingShan"></BuyBingShan>
        </div>
        <div v-show="buyTypeValue === '时间加权委托'">
          <BuyTimes ref="BuyTimes"></BuyTimes>
        </div>

        <Form-item>
          <div v-if="FetchTradeType === 'fetching'">
            <Spin></Spin>
          </div>
          <Row v-else-if="FetchTradeType === 'ok'">
            <Col span="18"><Button type="error" @click="handleSubmit" long>卖出</Button></Col>
          </Row>
          <p v-else-if="FetchTradeType === 'error'">TradeType类型获取失败, 请等待工程师修复。</p>
        </Form-item>
      </Form>
    </Tab-pane>
  </Tabs>
</template>
<script>
import SellBingShan from './forms/SellBingShan';
import SellTimes from './forms/SellTimes';
import BuyBingShan from './forms/BuyBingShan';
import BuyTimes from './forms/BuyTimes';
export default {
  name: "sellAndBuy",
  components: {
    SellBingShan,
    SellTimes,
    BuyBingShan,
    BuyTimes
  },
  data () {
    return {
      FetchTradeType: 'fetching',
      formData: {
        symbol: 'btc_cny',
        orderType: 'sell'
      },
      tradeTypeArr: [],
      tradeTypeObj: {},
      sellTypeValue: '',
      sellTradeType: '',
      buyTypeValue: '',
      buyTradeType: ''
    }
  },
  created () {
    this.fetchTradetype();
  },
  methods: {
    handleDropdownSellClick (id) {
      this.sellTypeValue = this.tradeTypeObj[id];
      this.sellTradeType = id;
    },
    handleDropdownBuyClick (id) {
      this.buyTypeValue = this.tradeTypeObj[id];
      this.buyTradeType = id;
    },
    handleTabsClick (name) {
      this.formData.orderType = name;
    },
    handleSubmit () {
      let formData = {};
      const originData = {...this.formData};
      const tabType = originData.orderType;
      let url = '';
      if (tabType === 'sell') {
        originData.tradeType = this.sellTradeType;
        if (this.sellTypeValue === '冰山委托') {
          url = 'icebergOrder';
          formData = this.onDealFormAndUrl('SellBingShan', originData);
        } else if (this.sellTypeValue === '时间加权委托') {
          url = 'timeWeightOrder';
          formData = this.onDealFormAndUrl('SellTimes', originData);
        }
      } else if (tabType === 'buy') {
        originData.tradeType = this.buyTradeType;
        if (this.buyTypeValue === '冰山委托') {
          url = 'icebergOrder';
          formData = this.onDealFormAndUrl('BuyBingShan', originData);
        } else if (this.buyTypeValue === '时间加权委托') {
          url = 'timeWeightOrder';
          formData = this.onDealFormAndUrl('BuyTimes', originData);
        }
      }
      if (formData === null) {
        this.$Message.error('表单验证没通过');
        return null;
      }
      this.$http({
        method:'post',
        url: `http://192.168.170.104:8080/${url}`,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(res => {
          this.$Message.success(`${res && res.statusText || ''}, 表单提交成功`);
        }, error => {
          this.$Message.error(`${error && error.statusText || ''}, 表单提交失败`);
        })
    },
    onDealFormAndUrl (refName, originData) {
      let formData = {};
      this.$refs[refName].returnFormData(function(data) {
        if (data === null) {
          formData = null;
        } else {
          formData = Object.assign({}, originData, data);
        };
      });
      return formData;
    },
    fetchTradetype () {
      this.$http.get('http://192.168.170.104:8080/tradetype')
      // this.$http.get('http://localhost:3001/tradetype')
        .then(response => {
          if (response.data &&  response.data.data.length > 0) {
            this.tradeTypeArr = response.data.data;
            this.sellTypeValue = this.buyTypeValue = this.tradeTypeArr[0].name;
            this.sellTradeType = this.buyTradeType = this.tradeTypeArr[0].id;
            this.tradeTypeArr.forEach(item => this.tradeTypeObj[item.id] = item.name);
          }
          this.FetchTradeType = 'ok';
        }, error => {
          this.$Message.error(`${error && error.statusText || 'TradeType类型获取失败'}, `);
          this.FetchTradeType = 'error';
        });
    }
  }
}
</script>
<style lang="less">

</style>
