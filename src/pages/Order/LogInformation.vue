<template>
  <div class="login-information">
    <Tabs value="deal" type="card" @on-click="handleChangeTab">
        <Tab-pane label="最近五笔未完成交易" name="deal">
          <div class="switch-box">
            <span v-for="deal in deals" :class="{btn:true, active: dealsType === deal.type}" @click="dealsClick(deal.type)">{{deal.text}}</span>
          </div>
          <Table :columns="currentDealsColumns" :data="dataDeals"></Table>
          <div v-if="isOverFives" class="lookMore" @click="handleLookMoreClick">
            查看更多
          </div>
        </Tab-pane>
        <Tab-pane label="历史委托" name="history">
          <div class="switch-box">
            <span v-for="deal in deals" :class="{btn:true, active: historyType === deal.type}" @click="historyClick(deal.type)">{{deal.text}}</span>
          </div>
          <Table :columns="currentHistoryColumns" :data="historyDeals"></Table>
          <div v-if="isOverFives" class="lookMore" @click="handleLookMoreClick">
            查看更多
          </div>
        </Tab-pane>
    </Tabs>
  </div>
</template>
<script>
import {selectStatus, formatDate} from '../../utils/utils';
import config from '../../config';
export default {
  name: "LogInformation",
  timer: null,
  props: ['symbol', 'setMiddleBoxDomH'],
  data () {
    return {
      deals: [
        {text: '普通委托', type: 'normalOrders'},
        {text: '冰山委托', type: 'icebergTrade'},
        {text: '时间加权委托', type: 'timeWeightTrade'},
      ],
      isOverFives: false,
      currentTab: 'deal',
      dealsType: 'normalOrders',
      historyType: 'normalOrders',
      currentDealsColumns: [],
      currentHistoryColumns: [],
      columnsNormal: [
        {
          title: '委托时间',
          key: 'create_date'
        }, {
          title: '委托类型',
          key: 'type',
          width: 90,
          render: (h, params) => {
            const type = params.row.type === 'sell' ? '卖' : '买';
            return h('span', {}, type);
          }
        }, {
          title: '委托数量(฿)',
          key: 'amount'
        }, {
          title: '委托价格(￥)',
          key: 'price'
        }, {
          title: '成交数量',
          key: 'deal_amount',
          width: 90
        }, {
          title: '平均成交价',
          key: 'avg_price',
          render: (h, params) => {
            const row = params.row;
            if (row.avg_price === 'None') {
              return h('span', {}, '0');
            }
            return h('span', {}, row.avg_price);
          }
        }, {
          title: '尚未成交',
          key: 'undone',
          width: 90
        }, {
          title: '交易所名称',
          key: 'platform'
        }, {
          title: '操作/状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row;
            const color = selectStatus(row.status, 'color')
            const text = selectStatus(row.status)
            const renders = this.setStatusRenders(row);
            return h('div', renders(h))
          }
        }
      ],
      columnsIceberg: [
        {
          title: '委托时间',
          key: 'create_date'
        }, {
          title: '委托类型',
          key: 'type',
          width: 90,
          render: (h, params) => {
            const type = params.row.type === 'sell' ? '卖' : '买';
            return h('span', {}, type);
          }
        }, {
          title: '总委托数量',
          key: 'amount'
        },  {
          title: '单次委托均值',
          key: 'avg_amount'
        }, {
          title: '委托深度',
          key: 'order_depth'
        }, {
          title: '最高/最低价格',
          key: 'border_price'
        }, {
          title: '已成交量',
          key: 'deal_amount'
        }, {
          title: '操作/状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row;
            const color = selectStatus(row.status, 'color')
            const text = selectStatus(row.status)
            const renders = this.setStatusRenders(row);
            return h('div', renders(h))
          }
        }
      ],
      columnsTimeWeight: [
        {
          title: '委托时间',
          key: 'create_date'
        }, {
          title: '委托类型',
          key: 'type',
          width: 90,
          render: (h, params) => {
            const type = params.row.type === 'sell' ? '卖' : '买';
            return h('span', {}, type);
          }
        }, {
          title: '总委托数量',
          key: 'amount'
        },  {
          title: '扫单范围',
          key: 'order_depth'
        }, {
          title: '扫单比例',
          key: 'trade_ratio'
        }, {
          title: '单笔上限',
          key: 'border_amount'
        }, {
          title: '最高/最低价格',
          key: 'border_price'
        }, {
          title: '委托间隔',
          key: 'trade_interval'
        }, {
          title: '已成交量',
          key: 'deal_amount'
        }, {
          title: '操作/状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row;
            const color = selectStatus(row.status, 'color')
            const text = selectStatus(row.status)
            const renders = this.setStatusRenders(row);
            return h('div', renders(h))
          }
        }
      ],
      dataDeals: [],
      historyDeals: []
    }
  },
  methods: {
    dealsClick (type) {
      this.dealsType = type;
      this.$nextTick(function () {
        this.selectColumns(this.dealsType, 'deals');
        this.fetchDealsTradeList(this.setMiddleBoxDomH);
      })
    },
    handleChangeTab (name) {
      this.currentTab = name;
    },
    historyClick (type) {
      this.historyType = type;
      this.$nextTick(function () {
        this.selectColumns(this.historyType, 'history');
        this.fetchHistoryTradeList(this.setMiddleBoxDomH);
      })
    },
    handleLookMoreClick() {
      this.$router.push('/');
    },
    setStatusRenders(row) {
      const status = row.status;
      const color = selectStatus(status, 'color');
      const text = selectStatus(status);
      const renders = [];
      return (h) => {
        if (Number(status) === 1 || Number(status) === 0) {
          renders.push(h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => {
                this.$Modal.confirm({
                  content: `<h3>确认删除吗？</h3>`,
                  onOk: () => {
                    this.fetchCancel(row)
                  }
                })
              }
            }
          }, '撤销'))
        }
        renders.push(h('Tag', {
          props: {
            type: 'border',
            color
          }
        }, text));
        return renders;
      }
    },
    selectColumns (deals, type) {
      switch (deals) {
        case 'normalOrders':
          if (type === 'deals') {
            this.currentDealsColumns = this.columnsNormal;
          } else if (type === 'history') {
            this.currentHistoryColumns = this.columnsNormal;
          }
          break;
        case 'icebergTrade':
          if (type === 'deals') {
            this.currentDealsColumns = this.columnsIceberg;
          } else if (type === 'history') {
            this.currentHistoryColumns = this.columnsIceberg;
          }
          break;
        case 'timeWeightTrade':
          if (type === 'deals') {
            this.currentDealsColumns = this.columnsTimeWeight;
          } else if (type === 'history') {
            this.currentHistoryColumns = this.columnsTimeWeight;
          }
          break;
        default:
          this.currentDealsColumns = this.columnsNormal;
          this.currentHistoryColumns = this.columnsNormal;
      }
    },
    formatDate (dates, key) {
      if (!dates.length) return;
      dates.map(date => {
        date[key || 'create_date'] = formatDate(date.create_date);
        return date;
      });
      return dates;
    },
    fetchDealsTradeList(cd) {
      this.$http.get(`${config.apiHost}/tradeList?symbol=${this.symbol}&isFinish=0&type=${this.dealsType}`)
        .then(response => {
          const data = Array.prototype.slice.call(response.data.orders, 0);
          data.length > 5 ? this.isOverFives = true : this.isOverFives = false;
          data.map(item => {
            item.undone = item.amount - item.amount;
          });
          this.dataDeals = this.formatDate(data);
          response.data.alertData.map(item => {
            this.$Notice.open({
              title: `${item.symbol.split('_')[0].toUpperCase()}${item.type === 'sell' ? '卖出' : '买入'}限价单已完全成交:`,
              desc: `<p>成交均价：￥${item.avg_price} 成交数量：฿${item.deal_amount}</P>
                <p>成交平台：${item.platform}</P>
              `,
              duration: 6
            });
          });
          this.$nextTick(() => {
            cd();
          });
        }, error => {
          this.$Message.error('TradeList类型获取失败');
          this.dataDeals = [];
        })
    },
    fetchHistoryTradeList(cd) {
      this.$http.get(`${config.apiHost}/tradeList?symbol=${this.symbol}&isFinish=1&type=${this.historyType}`)
        .then(response => {
          const data = Array.prototype.slice.call(response.data.orders, 0);
          data.length > 5 ? this.isOverFives = true : this.isOverFives = false;
          data.map(item => {
            item.undone = item.amount - item.amount;
          });
          this.historyDeals = this.formatDate(data);
          response.data.alertData.map(item => {
            this.$Notice.open({
              title: `${item.symbol.split('_')[0].toUpperCase()}${item.type === 'sell' ? '卖出' : '买入'}限价单已完全成交:`,
              desc: `<p>成交均价：￥${item.avg_price} 成交数量：฿${item.deal_amount}</P>
                <p>成交平台：${item.platform}</P>
              `,
              duration: 6
            });
          });
          this.$nextTick(() => {
            cd();
          });
        }, error => {
          this.$Message.error('TradeList类型获取失败');
          this.historyDeals = [];
        })
    },
    fetchCancel(row) {
      let opt = '';
      if (this.dealsType === 'normalOrders') {
        opt = `type=normalOrders&platform=${row.platform}&symbol=${row.symbol}&orderId=${row.order_id}`;
      } else {
        opt = `type=trade&id=${row.id}`;
      }
      this.$http.get(`${config.apiHost}/cancel?${opt}`)
        .then(response => {
          if (this.currentTab === 'deal') {
            this.fetchDealsTradeList(this.setMiddleBoxDomH);
          } else if (this.currentTab === 'history') {
            this.fetchHistoryTradeList(this.setMiddleBoxDomH);
          }
          this.$Message.success('撤销成功');
        }, error => {
          this.$Message.error('撤销失败');
        })
    }
  },
  created () {
    this.currentDealsColumns = this.columnsNormal;
    this.currentHistoryColumns = this.columnsNormal;
    this.fetchDealsTradeList(this.setMiddleBoxDomH);
  },
  activated() {
    this.timer = window.setInterval(() => {
      if (this.currentTab === 'deal') {
        this.fetchDealsTradeList(this.setMiddleBoxDomH);
      } else if (this.currentTab === 'history') {
        this.fetchHistoryTradeList(this.setMiddleBoxDomH);
      }
    }, 1000)
  },
  deactivated() {
    window.clearInterval(this.timer);
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variable/index.less';
.login-information {
  margin-top: 10px;
  .ivu-tabs-tabpane {
    .switch-box {
      padding: 0px 10px 10px;
    }
    .lookMore {
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      color: @base;
    }
    .btn {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      cursor: pointer;
      border: 1px solid @dark-light;
      color: @dark-light;
      border-radius: 4px;
      padding: 0 15px;
      margin-right: 40px;
    }
    .btn.active {
      color: #ffffff;
      background: @base;
      border: @base;
    }
  }
}
</style>
