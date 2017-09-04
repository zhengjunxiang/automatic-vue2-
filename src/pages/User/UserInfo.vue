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
            <Row>
              <Col><Button type="primary" :loading="loading" long>确认提交</Button></Col>
            </Row>
          </Form-item>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data: () => ({
    formValidate: {
      loading: false,
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
        { validator: 'Number', trigger: 'blur' }
      ]
    }
  })
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
