<template>
  <Table class="asksAndDids-table" :row-class-name="rowClassName" :columns="columnsAsksAndBids" :data="totalData"></Table>
</template>
<script>
import config from '@/config';
import pako from 'pako';
export default {
  name: "asksAndDids",
  timer: null,
  props: ['symbol'],
  data () {
    return {
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
      okWS: null,
      hbWS: null,
      number: 7,
      asksOkData: [],
      bidsOkData: [],
      asksHbData: [],
      bidsHbData: [],
      totalData: []
    }
  },
  activated() {
    this.createOkWSConnect();
    this.createHbWSConnect();
  },
  deactivated() {
    this.closeOkWSConnect();
    this.closeHbWSConnect();
  },
  methods: {
    handleReturnSymbol() {
      let symbol = '';
      switch (this.symbol) {
        case 'btc_cny':
          symbol = 'btc';
          break;
        case 'ltc_cny':
          symbol = 'ltc';
          break;
        default:
          symbol = 'btc';
      }
      return symbol;
    },
    changeSymbol() {
      this.closeOkWSConnect();
      this.closeHbWSConnect();
      this.$nextTick(() => {
        this.createOkWSConnect();
        this.createHbWSConnect();
      });
    },
    resetTotal() {
      this.totalData = [];
    },
    setTotalData() {
      let asksData = [], bidsData = [];
      asksData = this.asksOkData.concat(this.asksHbData).sort((m, n) => {
        return n[0] - m[0];
      }).slice((asksData.length - this.number - 1), (asksData.length - 1)).map((item, index) => ({
        name: `卖(${this.number - index})`,
        price: item[0],
        orders: item[1],
        platform: item[2]
      }));
      bidsData = this.bidsOkData.concat(this.bidsHbData).sort((m, n) => {
        return n[0] - m[0];
      }).slice(0, this.number).map((item, index) => ({
        name: `买(${index + 1})`,
        price: item[0],
        orders: item[1],
        platform: item[2]
      }));
      this.totalData = asksData.concat(bidsData);
    },
    createOkWSConnect() {
      const okWS = new WebSocket("wss://real.okcoin.cn:10440/websocket/okcoinapi"),
              me = this;
      this.okWS = okWS
      okWS.onopen = function(evt) {
        okWS.send(JSON.stringify({"event": "addChannel", "channel": `ok_sub_spotcny_${me.handleReturnSymbol()}_depth_20`}));
      };
      okWS.onmessage = function(evt) {
        const data = JSON.parse(evt.data)[0].data;
        let asksData = [];
        if (data.asks || data.bids) {
          asksData = data.asks.sort(function (m, n) {
            return m[0] - n[0]
          });
          // console.log('okData', asksData);
          me.asksOkData = asksData.slice(0, me.number).map(item => {
            item[2] = 'okcoin';
            return item;
          });
          me.bidsOkData = data.bids.slice(0, me.number).map((item, index) => {
            item[2] = 'okcoin';
            return item;
          });
          me.setTotalData();
        }
      };
    },
    closeOkWSConnect() {
      if (this.okWS) {
        this.okWS.close();
      }
    },
    createHbWSConnect() {
      const hbWS = new WebSocket("wss://api.huobi.com/ws"),
            me = this;
      hbWS.binaryType = "arraybuffer";
      this.hbWS = hbWS
      hbWS.onopen = function(evt) {
        hbWS.send(JSON.stringify({"sub": `market.${me.handleReturnSymbol()}cny.depth.step0`, "id": "depth" + new Date()}));
      };
      hbWS.onmessage = function(evt) {
        const raw_data = event.data,
              ua = new Uint8Array(raw_data),
              json = pako.inflate(ua,{to:"string"}),
              data = JSON.parse(json);
        if(data["ping"]){
          hbWS.send(JSON.stringify({"pong":data["ping"]}));
        } else {
          if (data.tick) {
            // console.log('hbData', data.tick.asks);
            me.asksHbData = data.tick.asks.slice(0, me.number).map(item => {
              item[2] = 'huobi';
              return item;
            });
            me.bidsHbData = data.tick.bids.slice(0, me.number).map(item => {
              item[2] = 'huobi';
              return item;
            });
            me.setTotalData();
          }
        }
      };
    },
    closeHbWSConnect() {
      if (this.hbWS) {
        this.hbWS.close();
      }
    },
    rowClassName (row) {
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
