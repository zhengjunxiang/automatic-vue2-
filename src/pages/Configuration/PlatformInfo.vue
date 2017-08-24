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
        ref="platformModal"
      ></platform-modal>
    </Col>
  </Row>
</template>
<script>
import PlatformModal from './PlatformModal'
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
                    const id = params.row.id;
                    this.$Modal.confirm({
                      content: `<h3>确认删除<span style="color: red">${params.row.name}</span>吗？</h3>`,
                      onOk: () => {
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
    fetchApiInfoList() {
      this.$http.get('http://192.168.170.104:8080/platformList?type=show').
        then(response => {
          if (response.data && response.data.data.length > 0) {
            this.apiInfoListData = [].concat(response.data.data);
            this.$Message.success(`${response && response.statusText || ''}, 请求apiInfoList数据成功`);
          }
        }, error => {
          this.$Message.error(`${error && error.statusText || ''}, 请求apiInfoList数据失败`);
        });
    },
  }
}
</script>
<style lang="less">
</style>
