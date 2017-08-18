<template>
  <Tabs value="name1">
    <Tab-pane label="交易所信息配置" name="name1">
      <Row :gutter="16">
        <Col span="12">
          <Form :model="formValidate" :label-width="80">
            <Form-item label="交易平台" prop="passwd">
              <Select placeholder="请选择...">
                <Option value="OkCoin">OkCoin</Option>
                <Option value="火币">火币</Option>
              </Select>
            </Form-item>
            <Form-item label="ApiKey" prop="password">
              <Input v-model="formValidate.password"></Input>
            </Form-item>
            <Form-item label="Api密钥" prop="passwd">
              <Input></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" long>提交</Button>
            </Form-item>
          </Form>
        </Col>
        <Col span="12"></Col>
      </Row>
    </Tab-pane>
  </Tabs>
</template>
<script>
export default {
  name: "",
  data () {
    return {
      formValidate: {
        user: '',
        password: ''
      },
      ruleValidate: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
