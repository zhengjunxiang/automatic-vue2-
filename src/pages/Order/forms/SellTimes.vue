<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="90">
    <Form-item label="卖出数量：" prop="amount">
      <Row>
        <Col span="18"><Input v-model="formValidate.amount" icon="social-bitcoin"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="扫单范围：" prop="fanwei">
      <Row>
        <Col span="18"><Input v-model="formValidate.fanwei" icon="social"></Input></Col>
        <Col span="5" offset="1">(参考值：0.1%)</Col>
      </Row>
    </Form-item>
    <Form-item label="扫单比例：" prop="bili">
      <Row>
        <Col span="18"><Input v-model="formValidate.bili" icon="social"></Input></Col>
        <Col span="5" offset="1">(参考值：10%)</Col>
      </Row>
    </Form-item>
    <Form-item label="单笔委托上限：" prop="shangxian">
      <Row>
        <Col span="18"><Input v-model="formValidate.shangxian" icon="social-bitcoin"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="最低价格：" prop="minPrice">
      <Row>
        <Col span="18"><Input v-model="formValidate.minPrice" icon="social-yen"></Input></Col>
      </Row>
    </Form-item>
    <Form-item label="委托间隔：" prop="jiange">
      <Row>
        <Col span="18"><Input v-model="formValidate.jiange" icon="second"></Input></Col>
        <Col span="5" offset="1">(参考值：10s)</Col>
      </Row>
    </Form-item>
  </Form>
</template>
<script>
export default {
  name: "SellTimes",
  data () {
    const validateNumber = (rule, value, callback) => {
      const reg = /^[0-9]+([.]{1}[0-9]{1,})?$/;
      if (value === '') {
        callback(new Error('请输入内容'));
      } else if(!reg.test(value)) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        amount: '',
        fanwei: '',
        bili: '',
        shangxian: '',
        minPrice: '',
        jiange: ''
      },
      ruleValidate: {
        amount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        fanwei: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        bili: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        shangxian: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        minPrice: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        jiange: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    returnFormData (cd) {
      const formValidate = this.formValidate;
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          cd(formValidate)
        } else {
          cd(null);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
