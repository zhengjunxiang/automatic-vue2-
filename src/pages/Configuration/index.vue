<template>
  <Tabs value="info">
    <Tab-pane label="交易所信息配置" name="info">
      <Row :gutter="16">
        <Col span="12">
          <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
            <Form-item label="交易平台" prop="platform">
              <Select v-model="formValidate.platform" placeholder="请选择...">
                <Option value="OkCoin">OkCoin</Option>
                <Option value="火币">火币</Option>
              </Select>
            </Form-item>
            <Form-item label="ApiKey" prop="key">
              <Input v-model="formValidate.key"></Input>
            </Form-item>
            <Form-item label="Api密钥" prop="password">
              <Input v-model="formValidate.password"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" long @click="handleSubmit('formValidate')">提交</Button>
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
        platform: '',
        key: '',
        password: ''
      },
      ruleValidate: {
        platform: [{required: true, message: '选择项不能为空', trigger: 'blur'}],
        key: [
          {required: true, message: '请填写ApiKey', trigger: 'blur'},
          {type: 'string', min: 6, message: 'ApiKey长度不能小于6位', trigger: 'blur'}
        ],
        password: [
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
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
