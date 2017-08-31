<template>
  <Row :gutter="16">
    <Col span="23">
      <header class="api-header">
        <h2 class="api-title">交易所信息列表</h2>
        <Button class="api-add-btn" type="primary" @click="handlePlatformAddBtnClick('add')">
          <Icon type="plus"></Icon>
        </Button>
      </header>
      <Table :columns="columns" :data="apiInfoListData"></Table>
      <platform-modal
        :modalOpt="currentModalOpt"
        :fetchPlatformInfoList="fetchPlatformInfoList"
        ref="platformModal"
      ></platform-modal>
    </Col>
  </Row>
</template>
<script>
import PlatformModal from './PlatformModal';
import config from '../../config';
export default {
  name: "PlatformInfo",
  components: {
    PlatformModal
  },
  data () {
    return {
      currentModalOpt: 'add',
      apiInfoListData: [],
      columns: [{
          title: '名称',
          key: 'name'
        }, {
          title: 'Api地址',
          key: 'url'
        }, {
          title: '是否启用',
          key: 'disableFlag',
          render: (h, params) => {
            return h('div', {}, Number(params.row.disableFlag) ? '禁用': '启用')
          }
        }, {
          title: '创建时间',
          key: 'createDate'
        }, {
          title: '修改时间',
          key: 'modifyDate'
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
                    this.fetchGetPlatformInfo(params.row.id)
                    this.handlePlatformAddBtnClick('edit');
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
                        this.fetchDelPlatformInfo(params.row.id);
                      }
                    })
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    }
  },
  methods: {
    handlePlatformAddBtnClick(opt) {
      opt ? this.currentModalOpt = opt : null;
      this.$refs.platformModal.showApiModal();
    },
    fetchPlatformList() {
      this.$http.get(`${config.apiHost}/platformList?type=select`).
        then(response => {
          if (response.data && response.data.data.length > 0) {
            this.platforsmData = [].concat(response.data.data);
          }
        }, error => {
          this.$Message.error('请求platformList数据失败');
        });
    },
    fetchPlatformInfoList() {
      this.$http.get(`${config.apiHost}/platformList?type=show`).
        then(response => {
          if (response.data && response.data.data.length > 0) {
            this.apiInfoListData = [].concat(response.data.data);
            this.$Message.success('请求platformInfoList数据成功');
          }
        }, error => {
          this.$Message.error('请求platformInfoList数据失败');
        });
    },
    fetchGetPlatformInfo(id) {
      this.$http.get(`${config.apiHost}/getPlatform?id=${id}`).
        then(response => {
          if (response.data && Object.keys(response.data).length > 0) {
            const apiInfoData = {...response.data.data};
            this.handleSetEditFormValidate(apiInfoData[0]);
          }
        }, error => {
          this.$Message.error('请求getApiInfo数据失败');
        });
    },
    fetchDelPlatformInfo(id) {
      this.$http.get(`${config.apiHost}/delPlatform?id=${id}`).
        then(response => {
          this.$Message.success(`请求delPlatform数据成功`);
          this.fetchPlatformInfoList();
        }, error => {
          this.$Message.error(`请求delPlatform数据失败`);
        });
    },
    handleSetEditFormValidate(data) {
      this.$refs.platformModal.formValidate = {
        id: data.id || '',
        name: data.name || '',
        url: data.url || '',
        disableFlag: data.disableFlag || '0'
      }
    },
    fetchData() {
      this.fetchPlatformInfoList();
      this.fetchPlatformList();
    }
  }
}
</script>
