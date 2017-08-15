<template>
  <Row>
    <Col :span="22">
      <Tabs value="name1">
        <Tab-pane label="已完成" name="name1">
          <Table border :columns="columns" :data="dealedCurrentData"></Table>
          <Page :total="dealedDataLength" :current="1" :pageSize="pageSize" @on-change="handlePageChang"></Page>
        </Tab-pane>
        <Tab-pane label="未完成" name="name2">标签二的内容</Tab-pane>
      </Tabs>
    </Col>
  </Row>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Home',
  created () {
    this.$store.dispatch('home/fetchHistory').then((response) => {
      this.dealHomeData()
      this.handlePageChang()
      this.$Message.success(`${response && response.statusText || ''}, 请求数据成功`);
    }, (error) => {
      this.$Message.error(`${error && error.statusText || ''}, 请求数据失败`);
    })
  },
  methods: {
    selectStatus (state, type) {
      const isColor = type === 'color'
      switch (state - 0) {
        case -1:
          return isColor ? 'red' : '已撤销'
        case 0:
          return isColor ? 'orange' : '未成交'
        case 1:
          return isColor ? 'blue' : '部分成交'
        case 2:
          return isColor ? 'green' : '完全成交'
        case 4:
          return isColor ? 'yellow' : '撤单处理中'
        default:
          return '确认中'
      }
    },
    dealHomeData () {
      this.dealedData = [].concat(this.$store.getters['home/getHomeData'])
      this.dealedData.map(item => {
        item.create_date = moment(item.create_date).format('YYYY MM DD, h:mm:ss a')
        return item
      })
    },
    handlePageChang (size = 1) {
      this.dealedCurrentData = this.dealedData.slice(this.pageSize * size - this.pageSize, this.pageSize * size);
    }
  },
  data () {
    return {
      columns: [
        {
          title: '数量',
          key: 'amount',
          sortable: true
        }, {
          title: '平均价格 (btc_cny)',
          key: 'avg_price',
          sortable: true
        }, {
          title: '价格 (btc_cny)',
          key: 'price',
          sortable: true
        }, {
          title: '成交数量',
          key: 'deal_amount',
          sortable: true
        }, {
          title: '创建时间',
          key: 'create_date'
        }, {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = this.selectStatus(row.status, 'color')
            const text = this.selectStatus(row.status)
            return h('Tag', {
              props: {
                type: 'border',
                color
              }
            }, text);
          }
        }
      ],
      pageSize: 10,
      dealedDataLength: 0,
      dealedCurrentData: [],
      dealedData: []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
