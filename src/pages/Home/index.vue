<template>
  <Row>
    <Col>
      <Tabs value="1" @on-click="fetchHistory">
        <Tab-pane label="已完成" name="1">
          <Table border :columns="columns" :data="dealedCurrentData1"></Table>
          <Page :total="dealedDataLength1" :current="1" :pageSize="pageSize" @on-change="handlePageChang1"></Page>
        </Tab-pane>
        <Tab-pane label="未完成" name="0">
          <Table border :columns="columns" :data="dealedCurrentData0"></Table>
          <Page :total="dealedDataLength0" :current="1" :pageSize="pageSize" @on-change="handlePageChang0"></Page>
        </Tab-pane>
        <Tab-pane label="已撤销" name="_1">
          <Table border :columns="columns" :data="dealedCurrentData_1"></Table>
          <Page :total="dealedDataLength_1" :current="1" :pageSize="pageSize" @on-change="handlePageChang_1"></Page>
        </Tab-pane>
      </Tabs>
    </Col>
  </Row>
</template>
<script>
import {selectStatus, formatDate} from '@/utils/utils';
export default {
  name: 'Home',
  created () {
    this.fetchHistory('1');
  },
  methods: {
    fetchHistory(type = '1') {
      if (this.currentType === type) return null;
      this.currentType = type;
      this.$store.dispatch(`home/fetchHistory${type}`).then((response) => {
        this.dealHomeData(type)
        this[`handlePageChang${type}`]()
        this.$Message.success(`请求history${type}数据成功`);
      }, (error) => {
        this.$Message.error(`请求history${type}数据成功`);
      });
    },
    dealHomeData(type) {
      this[`dealedData${type}`] = [].concat(this.$store.getters[`home/getHomeData${type}`])
      this[`dealedDataLength${type}`] = this[`dealedData${type}`].length
      this[`dealedData${type}`].map(item => {
        item.create_date = formatDate(item.create_date)
        return item
      });
    },
    handlePageChang1(size = 1) {
      this.dealedCurrentData1 = this.dealedData1.slice(this.pageSize * size - this.pageSize, this.pageSize * size);
    },
    handlePageChang0(size = 1) {
      this.dealedCurrentData0 = this.dealedData0.slice(this.pageSize * size - this.pageSize, this.pageSize * size);
    },
    handlePageChang_1(size = 1) {
      this.dealedCurrentData_1 = this.dealedData_1.slice(this.pageSize * size - this.pageSize, this.pageSize * size);
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
      currentType: '0',
      pageSize: 10,
      dealedDataLength1: 0,
      dealedDataLength0: 0,
      dealedDataLength_1: 0,
      dealedCurrentData1: [],
      dealedCurrentData0: [],
      dealedCurrentData_1: [],
      dealedData1: [],
      dealedData0: [],
      dealedData_1: []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
