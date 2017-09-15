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
      <Form-item label="名称" prop="name">
        <Input v-model="formValidate.name"></Input>
      </Form-item>
      <Form-item label="Api地址" prop="url">
        <Input v-model="formValidate.url"></Input>
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
import config from '@/config';
export default {
  name: "PlatformModal",
  props: ["modalOpt", "fetchPlatformInfoList"],
  data () {
    return {
      isShow: false,
      loading: true,
      formValidate: {
        id: '',
        name: '',
        url: '',
        disableFlag: '0'
      },
      ruleValidate: {
        name: [
          {required: true, message: '请填写名称', trigger: 'blur'},
          {type: 'string', min: 2, message: '名称长度不能小于2位', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请填写Api地址', trigger: 'blur'},
          {type: 'string', min: 6, message: 'Api地址长度不能小于6位', trigger: 'blur'}
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
            url: `${config.apiHost}/platform/savePlatform`,
            data: this.formValidate,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then(res => {
            if (res.data.status) {
              this.$Message.success('表单savePlatform编辑成功');
              this.hiddenApiModal();
              this.fetchPlatformInfoList();
            } else {
              this.$Message.error({content: `${res.data.message}，表单savePlatform编辑失败`, duration: 5});
              this.handleHiddenLoading();
            }
          }, error => {
            this.$Message.error({content: `${error.message}, 表单savePlatform提交失败`, duration: 5});
            this.handleHiddenLoading();
          });
        } else {
          this.$Message.error({content: 'savePlatform表单验证失败!', duration: 5});
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
      this.formValidate = {id: '', name: '', url: '', disableFlag: '0'}
    },
    handleSetTitle() {
      return this.modalOpt === 'add' ? '添加交易所信息' : '编辑交易所信息';
    }
  }
}
</script>
