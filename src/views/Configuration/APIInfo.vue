<template>
  <Row :gutter="16">
    <Col span="23">
      <header class="api-header">
        <h2 class="api-title">API列表</h2>
        <Button class="api-add-btn" type="primary" @click="handleApiAddBtnClick('add')">
          <Icon type="plus"></Icon>
        </Button>
      </header>
      <Table :columns="columns" :data="apiInfoListData"></Table>
      <api-modal
        :modalOpt="currentModalOpt"
        :platforsmData="platforsmData"
        :fetchApiInfoList="fetchApiInfoList"
        ref="apiModal">
      </api-modal>
    </Col>
  </Row>
</template>
<script>
import ApiModal from './ApiModal';
import config from '@/config';
export default {
  name: "ApiInfo",
  components: {
    ApiModal
  },
  data() {
    return {
      columns: [{
          title: '名称',
          key: 'name'
        }, {
          title: '交易所',
          key: 'platform'
        }, {
          title: 'ApiKey',
          key: 'apiKey'
        }, {
          title: '优先级',
          key: 'priority',
          render: (h, params) => {
            const priority = params.row.priority;
            const text = (() => {
              if (Number(priority) === 1) {
                return '低';
              } else if (Number(priority) === 2) {
                return '中';
              } else {
                return '高';
              }
            })();
            return h('div', {}, text)
          }
        }, {
          title: '是否启用',
          key: 'disableFlag',
          render: (h, params) => {
            return h('div', {}, Number(params.row.disableFlag) ? '禁用': '启用')
          }
        }, {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.fetchGetApiInfo(params.row.id)
                    this.handleApiAddBtnClick('edit');
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      content: `<h3>确认删除<span style="color: red">${params.row.name}</span>吗？</h3>`,
                      onOk: () => {
                        this.fetchDelApiInfo(params.row.id);
                      }
                    })
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      apiInfoListData: [],
      platforsmData: [],
      currentModalOpt: 'add'
    }
  },
  methods: {
    handleApiAddBtnClick(opt) {
      opt ? this.currentModalOpt = opt : null;
      this.$refs.apiModal.showApiModal();
    },
    fetchApiInfoList() {
      this.$http.get(`${config.apiHost}/api/apiInfoList`).
        then(response => {
          if (response.data && response.data.data.length > 0) {
            this.apiInfoListData = [].concat(response.data.data);
            this.$Message.success('请求apiInfoList数据成功');
          }
        }, error => {
          this.$Message.error('请求apiInfoList数据失败');
        });
    },
    fetchPlatformList() {
      this.$http.get(`${config.apiHost}/platform/platformList?type=select`).
        then(response => {
          if (response.data && response.data.data.length > 0) {
            this.platforsmData = [].concat(response.data.data);
          }
        }, error => {
          this.$Message.error('请求platformList数据失败');
        });
    },
    fetchGetApiInfo(id) {
      this.$http.get(`${config.apiHost}/api/getApiInfo?id=${id}`).
        then(response => {
          if (response.data && Object.keys(response.data).length > 0) {
            const apiInfoData = {...response.data};
            this.handleSetEditFormValidate(apiInfoData);
          }
        }, error => {
          this.$Message.error('请求getApiInfo数据失败');
        });
    },
    fetchDelApiInfo(id) {
      this.$http.get(`${config.apiHost}/api/delApiInfo?id=${id}`).
        then(response => {
          this.$Message.success(`请求delApiInfo数据成功`);
          this.fetchApiInfoList();
        }, error => {
          this.$Message.error(`请求delApiInfo数据失败`);
        });
    },
    handleSetEditFormValidate(data) {
      this.$refs.apiModal.formValidate = {
        platform: data.platform || '',
        id: data.id || '',
        name: data.name || '',
        apiKey: data.apiKey || '',
        apiSecret: data.apiSecret || '',
        priority: data.priority || '2',
        disableFlag: data.disableFlag || '0'
      }
    },
    fetchData() {
      this.fetchApiInfoList();
      this.fetchPlatformList();
    }
  },
  created() {
    this.fetchData();
  }
}
</script>
