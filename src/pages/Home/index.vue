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
import {selectStatus, formatDate} from '../../utils/utils'
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
    dealHomeData () {
      this.dealedData = [].concat(this.$store.getters['home/getHomeData'])
      this.dealedData.map(item => {
        item.create_date = formatDate(item.create_date)
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
          sortable: true,
          render: (h, params) => {
            const avg_price = params.row.avg_price === 'None' ? 0 : params.row.avg_price;
            return h('span', {}, avg_price);
          }
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
            const color = selectStatus(row.status, 'color')
            const text = selectStatus(row.status)
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
