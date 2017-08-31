<template>
  <Table class="asksAndDids-table" :row-class-name="rowClassName" :columns="columnsAsksAndBids" :data="totalData"></Table>
</template>
<script>
import config from '../../config'
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
      asksData: [],
      bidsData: [],
      totalData: []
    }
  },
  created () {
    this.fetchAsksAndDidsData();
  },
  activated() {
    this.timer = window.setInterval(this.fetchAsksAndDidsData, 2000);
  },
  deactivated() {
    window.clearInterval(this.timer);
  },
  methods: {
    fetchAsksAndDidsData () {
      this.$http.get(`${config.apiHost}/depth?symbol=${this.symbol}`)
      .then(response => {
        const data = response.data;
        if (data) {
          const Len = data.asks.length;
          this.asksData = data.asks.map((item, index) => ({
            name: `卖(${Len - index})`,
            price: item[0],
            orders: item[1],
            platform: item[2] || 'win'
          }));
          this.bidsData = data.bids.map((item, index) => ({
            name: `买(${index + 1})`,
            price: item[0],
            orders: item[1],
            platform: item[2] || 'mac'
          }));
          this.totalData = this.asksData.concat(this.bidsData);
        }
      }, (error) => {
        this.$Message.error('请求depth数据失败');
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
