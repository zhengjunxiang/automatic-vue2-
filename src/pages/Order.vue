<template>
  <Row :gutter="30" class="order-page">
    <Col :md="12">
      <Tabs value="buy">
        <Tab-pane label="卖出" name="buy">
          <Form :model="formSellData" label-position="left" :label-width="80">
            <Form-item label="委托类型：">
              <Row>
                <Col span="18">
                  <Select v-model="formSellData.tradeType" placeholder="请选择所在地">
                    <Option v-for="item in tradeTypeArr" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="卖出数量：">
              <Row>
                <Col span="18"><Input v-model="formSellData.account" icon="social"></Input></Col>
              </Row>
            </Form-item>
            <Form-item label="单笔均值">
              <Row>
                <Col span="18"><Input v-model="formSellData.pirce" icon="social-bitcoin"></Input></Col>
              </Row>
            </Form-item>
            <Form-item label="委托深度">
              <Row>
                <Col span="18"><Input v-model="formSellData.orderDepth" icon="social-bitcoin"></Input></Col>
                <Col span="5" offset="1">(参考值：0.1%)</Col>
              </Row>
            </Form-item>
            <Form-item label="最低价格">
              <Row>
                <Col span="18"><Input v-model="formSellData.boderPrice" icon="social-yen"></Input></Col>
              </Row>
            </Form-item>
            <Form-item>
              <Row>
                <Col span="18"><Button type="error" @click="handleSubmit('sell')" long>卖出</Button></Col>
              </Row>
            </Form-item>
          </Form>
        </Tab-pane>

        <Tab-pane label="买入" name="sell">
          <Form :model="formBuyData" label-position="left" :label-width="80">
            <Form-item label="委托类型：">
              <Row>
                <Col span="18">
                  <Select v-model="formBuyData.tradeType" placeholder="请选择所在地">
                    <Option v-for="item in tradeTypeArr" :value="item.id" :key="item.id">{{item.name}}</Option>
                  </Select>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="卖出数量：">
              <Row>
                <Col span="18"><Input v-model="formBuyData.account" icon="social"></Input></Col>
              </Row>
            </Form-item>
            <Form-item label="单笔均值">
              <Row>
                <Col span="18"><Input v-model="formBuyData.pirce" icon="social-bitcoin"></Input></Col>
              </Row>
            </Form-item>
            <Form-item label="委托深度">
              <Row>
                <Col span="18"><Input v-model="formBuyData.orderDepth" icon="social-bitcoin"></Input></Col>
                <Col span="5" offset="1">(参考值：0.1%)</Col>
              </Row>
            </Form-item>
            <Form-item label="最低价格">
              <Row>
                <Col span="18"><Input v-model="formBuyData.boderPrice" icon="social-yen"></Input></Col>
              </Row>
            </Form-item>
            <Form-item>
              <Row>
                <Col span="18"><Button type="success" @click="handleSubmit('buy')" long>买入</Button></Col>
              </Row>
            </Form-item>
          </Form>
        </Tab-pane>
      </Tabs>
    </Col>
    <Col :md="12">
      <Table :row-class-name="rowClassName" :columns="columnsAsksAndBids" :data="totalData"></Table>
    </Col>
  </Row>
</template>
<script>
export default {
  name: 'Shop',
  timer: null,
  data () {
    return {
      formSellData: {
        symbol: 'btc_cny',
        orderType: 'sell',
        tradeType: '',
        account: '',
        pirce: '',
        orderDepth: '',
        boderPrice: ''
      },
      formBuyData: {
        symbol: 'btc_cny',
        orderType: 'buy',
        tradeType: '',
        account: '',
        pirce: '',
        orderDepth: '',
        boderPrice: ''
      },
      tradeTypeArr: [],
      columnsAsksAndBids: [
        {
          title: '买卖',
          key: 'name'
        }, {
          title: '价格（￥）',
          key: 'price'
        }, {
          title: '委托单（Ƀ）',
          key: 'orders'
        }, {
          title: '平台',
          key: 'platform'
        }
      ],
      asksData: [],
      bidsData: [],
      totalData: []
    }
  },
  created () {
    this.fetchTradetype();
    this.fetchAsksAndDidsData();
    this.timer = window.setInterval(this.fetchAsksAndDidsData, 3000);
  },
  beforeDestroy () {
    window.clearInterval(this.timer);
  },
  methods: {
    handleSubmit (type) {
      let fromData = {};
      if (type === 'sell') {
        fromData = this.formSellData;
      } else if (type === 'buy') {
        fromData = this.formBuyData;
      }
      console.log('fromData', Object.assign({}, fromData));
      this.$http({
        method:'post',
        url: 'http://192.168.2.166:8080/icebergOrder',
        data: JSON.stringify(Object.assign({}, fromData)),
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
    fetchTradetype () {
      this.$http.get('http://192.168.2.166:8080/tradetype')
        .then(response => {
          if (response.data &&  response.data.data.length > 0) {
            this.tradeTypeArr = response.data.data;
          }
        }, error => {
          console.log('error', error);
        });
    },
    fetchAsksAndDidsData () {
      // var ws = new WebSocket('wss://192.168.2.166:8080/depth');
      // ws.onopen = function(evt) {
      //   console.log("Connection open ...");
      //   ws.send("Hello WebSockets!");
      // };
      //
      // ws.onmessage = function(evt) {
      //   console.log( "Received Message: " + evt.data);
      //   ws.close();
      // };
      //
      // ws.onclose = function(evt) {
      //   console.log("Connection closed.");
      // };
      
      this.$http.get('http://192.168.2.166:8080/depth')
      // this.$http.get('http://localhost:3001/depth')
      .then(response => {
        const data = response.data;
        if (data) {
          const Len = data.asks.length;
          this.asksData = data.asks.map((item, index) => ({
            name: `卖(${Len - index})`,
            price: item[0],
            orders: item[1],
            platform: 'mac'
          }));
          this.bidsData = data.bids.map((item, index) => ({
            name: `买(${index + 1})`,
            price: item[0],
            orders: item[1],
            platform: 'win'
          }));
          this.totalData = this.asksData.concat(this.bidsData);
        }
        // this.$Message.success(`${response && response.statusText || ''}, 请求数据成功`);
      }, (error) => {
        // this.$Message.error(`${error && error.statusText || ''}, 请求数据失败`);
      })
    },
    rowClassName (row, index) {
      if (row.name.indexOf('卖') !== -1) {
        return 'ask-row';
      } else {
        return 'bids-row';
      }
      return '';
    }
  }
}
</script>
<style lang="less">
.order-page {
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
  .ivu-icon-social {
    font-size: 14px;
    font-weight: bold;
  }
  .ivu-icon-social::before {
    content: '%';
  }
}
</style>
