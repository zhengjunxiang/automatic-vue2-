<template>
  <Table :row-class-name="rowClassName" :columns="columnsAsksAndBids" :data="totalData"></Table>
</template>
<script>
export default {
  name: "asksAndDids",
  timer: null,
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
    // this.timer = window.setInterval(this.fetchAsksAndDidsData, 3000);
  },
  beforeDestroy () {
    window.clearInterval(this.timer);
  },
  methods: {
    fetchAsksAndDidsData () {
      this.$http.get('http://192.168.2.186:8080/depth')
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
