<template>
<div class="login-container">
  <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80" class="card-box login-form">
    <h3 class="title">系统登录</h3>
    <Form-item prop="name" label="账号">
      <Input v-model="formValidate.name" autoComplete="on" placeholder="账号"></Input>
    </Form-item>
    <Form-item prop="password" label="密码">
      <Input @keyup.enter.native="handleLogin" v-model="formValidate.password" autoComplete="on" placeholder="密码"></Input>
    </Form-item>
    <Form-item>
      <Button type="primary" long :loading="loading" @click.native.prevent="handleLogin('formValidate')" size="large">
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
      name: '',
      password: ''
    },
    ruleValidate: {
      name: [{
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
    handleLogin(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    }
  }
}
</script>
<style lang="less">
@import './login.less';
</style>
