<template>
  <Tabs value="sell" @on-click="handleTabsClick" type="card">
    <Tab-pane label="卖出" name="sell">
      <Form label-position="left" :label-width="90">
        <Form-item label="委托类型：">
          <Row type="flex">
            <Col :span="18">
              <Select v-model="sellTradeType" @on-change="handleSelectSellClick">
                <Option v-for="item in tradeTypeArr" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
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
              <Select v-model="buyTradeType" @on-change="handleSelectBuyClick">
                <Option v-for="item in tradeTypeArr" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
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
            <Col span="18"><Button type="success" @click="handleSubmit" long>买入</Button></Col>
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
import config from '@/config';
export default {
  name: "sellAndBuy",
  props: ['symbol'],
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
        symbol: this.symbol,
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
    handleSelectSellClick (id) {
      this.sellTypeValue = this.tradeTypeObj[id];
      this.sellTradeType = id;
    },
    handleSelectBuyClick (id) {
      this.buyTypeValue = this.tradeTypeObj[id];
      this.buyTradeType = id;
    },
    handleTabsClick (name) {
      this.formData.orderType = name;
    },
    handleSubmit () {
      let formData = {};
      this.formData.symbol = this.symbol;
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
        url: `${config.apiHost}/trade/${url}`,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (this.sellTypeValue === '冰山委托' && tabType === 'sell') {
          this.$refs['SellBingShan'].reset();
        } else if (this.sellTypeValue === '时间加权委托' && tabType === 'sell') {
          this.$refs['SellTimes'].reset();
        } else if (this.sellTypeValue === '冰山委托' && tabType === 'buy') {
          this.$refs['BuyBingShan'].reset();
        } else if (this.sellTypeValue === '时间加权委托' && tabType === 'buy') {
          this.$refs['BuyTimes'].reset();
        }
        this.$Message.success('表单提交成功');
      }, error => {
        this.$Message.error('表单提交失败');
      });
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
      this.$http.get(`${config.apiHost}/trade/tradetype`)
        .then(response => {
          if (response.data &&  response.data.data.length > 0) {
            this.tradeTypeArr = response.data.data;
            this.sellTypeValue = this.buyTypeValue = this.tradeTypeArr[0].name;
            this.sellTradeType = this.buyTradeType = this.tradeTypeArr[0].id;
            this.tradeTypeArr.forEach(item => this.tradeTypeObj[item.id] = item.name);
          }
          this.FetchTradeType = 'ok';
        }, error => {
          this.$Message.error('TradeType类型获取失败');
          this.FetchTradeType = 'error';
        });
    }
  }
}
</script>
