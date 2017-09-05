<template>
<div class="login-container">
  <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" class="card-box login-form">
    <h3 class="title">系统登录</h3>
    <Form-item prop="loginName">
      <Input v-model="formValidate.loginName" autoComplete="on" placeholder="账号">
        <Icon type="person" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input type="password" @keyup.enter.native="handleLogin" v-model="formValidate.password" autoComplete="on" placeholder="密码">
        <Icon type="lock-combination" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item>
      <Button type="primary" long :loading="loading" @click.native.prevent="handleLogin" size="large">
        登录
      </Button>
    </Form-item>
  </Form>
</div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    loading: false,
    formValidate: {
      loginName: '',
      password: ''
    },
    ruleValidate: {
      loginName: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 2,
          message: '账号格式不正确',
          trigger: 'blur'
        }
      ],
      password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 2,
          message: '名称长度不能小于2位',
          trigger: 'blur'
        }
      ]
    }
  }),
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Login', this.formValidate).then(res => {
            if (res.result) {
              this.$Message.success(res.message || '登录成功!');
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/' });
              }, 600);
              return null;
            }
            this.loading = false;
            this.$Message.error(res.message || '登录失败!');
          }).catch(error => {
            this.loading = false;
            this.$Message.error(error.message || '登录失败!');
          });
        } else {
          this.$Message.error('登录验证失败!');
          this.loading = false;
        }
      })
    }
  }
}
</script>
<style lang="less">
@import './login.less';
</style>
