<template>
  <div class="userinfo-container">
    <h3 class="title">密码重置：</h3>
    <Row>
      <Col span="12">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="90">
          <Form-item label="旧密码：" prop="oldPassword">
            <Row>
              <Col><Input type="password" v-model="formValidate.oldPassword" /></Col>
            </Row>
          </Form-item>
          <Form-item label="新密码：" prop="newPassword">
            <Row>
              <Col><Input type="password" v-model="formValidate.newPassword" /></Col>
            </Row>
          </Form-item>
          <Form-item label="确认密码：" prop="password">
            <Row>
              <Col><Input type="password" v-model="formValidate.password" /></Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary" :loading="loading" long @click.native.prevent="handleLogin">确认提交</Button>
          </Form-item>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import conf from '@/config';
export default {
  name: "UserInfo",
  data () {
    const validateOldpassword = (rule, value, callback) => {
      if(this.formValidate.newPassword !== this.formValidate.password) {
        callback(new Error('密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      formValidate: {
        oldPassword: '',
        newPassword: '',
        password: '',
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: 'Number', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: 'Number', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateOldpassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          let formData = {
            oldPassword: this.formValidate.oldPassword,
            newPassword: this.formValidate.newPassword
          };
          this.$http({
            method:'post',
            url: `${conf.apiHost}/user/updatePsw`,
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if (res.data.result) {
              this.$Message.success(res.data.message || '密码修改成功!');
              this.$refs['formValidate'].resetFields();
            } else {
              this.$Message.error(res.data.message || '密码修改失败!');
            }
          }).catch(err => {
            console.log('err', err)
            this.$Message.error(err || '密码修改失败!');
          });
          this.loading = false
        } else {
          this.loading = false;
          this.$Message.error('验证失败!');
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.userinfo-container {
  .title {
    line-height: 24px;
    margin-bottom: 8px;
  }
}
</style>
