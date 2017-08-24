<template>
  <Modal
    v-model="isShow"
    :title="handleSetTitle()"
    @on-ok="handleSubmit('formValidate')"
    :loading="loading"
    @ok-text="提交"
    @on-cancel="hiddenApiModal"
    >
    <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
      <Form-item label="交易平台" prop="platform">
        <Select v-model="formValidate.platform" placeholder="请选择...">
          <Option v-for="item in platforsmData" :value="item.id" key="item.id">{{item.name === 'HuoBi' ? '火币' : item.name}}</Option>
        </Select>
      </Form-item>
      <Form-item label="名称" prop="name">
        <Input v-model="formValidate.name"></Input>
      </Form-item>
      <Form-item label="ApiKey" prop="apiKey">
        <Input v-model="formValidate.apiKey"></Input>
      </Form-item>
      <Form-item label="Api密钥" prop="apiSecret">
        <Input v-model="formValidate.apiSecret"></Input>
      </Form-item>
      <Form-item label="优先级">
        <Radio-group v-model="formValidate.priority">
          <Radio label="3">高</Radio>
          <Radio label="2">中</Radio>
          <Radio label="1">低</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="是否启用">
        <Radio-group v-model="formValidate.disableFlag">
          <Radio label="0">启用</Radio>
          <Radio label="1">禁用</Radio>
        </Radio-group>
      </Form-item>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: "ApiModal",
  props: ["modalOpt", "platforsmData", "fetchApiInfoList"],
  data () {
    return {
      isShow: false,
      loading: true,
      formValidate: {
        platform: '',
        id: '',
        name: '',
        apiKey: '',
        apiSecret: '',
        priority: '2',
        disableFlag: '0'
      },
      ruleValidate: {
        platform: [{required: true, message: '选择项不能为空', trigger: 'change'}],
        name: [
          {required: true, message: '请填写名称', trigger: 'blur'},
          {type: 'string', min: 2, message: '名称长度不能小于2位', trigger: 'blur'}
        ],
        apiKey: [
          {required: true, message: '请填写ApiKey', trigger: 'blur'},
          {type: 'string', min: 6, message: 'ApiKey长度不能小于6位', trigger: 'blur'}
        ],
        apiSecret: [
          {required: true, message: '请填写Api密钥', trigger: 'blur'},
          {type: 'string', min: 6, message: 'Api密钥长度不能小于6位', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http({
            method:'post',
            url: `http://192.168.170.104:8080/saveApiInfo`,
            data: this.formValidate,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then(res => {
            if (res.data.status) {
              this.$Message.success('表单saveApiInfo编辑成功');
              this.hiddenApiModal();
              this.fetchApiInfoList();
            } else {
              this.$Message.error({content: `${res.data.message}，表单saveApiInfo编辑失败`, duration: 5});
              this.handleHiddenLoading();
            }
          }, error => {
            this.$Message.error({content: `${error.message}, 表单saveApiInfo提交失败`, duration: 5});
            this.handleHiddenLoading();
          });
        } else {
          this.$Message.error({content: 'saveApiInfo表单验证失败!', duration: 5});
          this.handleHiddenLoading();
        }
      })
    },
    handleHiddenLoading() {
      this.loading = false;
      setTimeout(() => {
        this.loading = true;
      }, 500);
    },
    hiddenApiModal() {
      this.initFormValidate();
      this.$refs.formValidate.resetFields();
      this.isShow = false;
    },
    showApiModal() {
      this.isShow = true;
    },
    initFormValidate() {
      this.formValidate = {platform: '', id: '', name: '', apiKey: '', apiSecret: '', priority: '2', disableFlag: '0'}
    },
    handleSetTitle() {
      return this.modalOpt === 'add' ? '添加Api信息' : '编辑Api信息';
    }
  }
}
</script>
<style lang="less" scoped>
</style>
